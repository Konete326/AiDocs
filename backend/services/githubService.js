let OctokitClass;
async function getOctokit(token) {
  if (!OctokitClass) {
    const octokitModule = await import('@octokit/rest');
    OctokitClass = octokitModule.Octokit;
  }
  return new OctokitClass({ auth: token });
}

async function getAuthenticatedUser(token) {
  const octokit = await getOctokit(token);
  const { data } = await octokit.users.getAuthenticated();
  return { username: data.login, avatarUrl: data.avatar_url, name: data.name || data.login, profileUrl: data.html_url };
}

async function createOrFetchRepo(token, { repoName, isPrivate = false, description = '' }) {
  const octokit = await getOctokit(token);
  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  try {
    const { data: existingRepo } = await octokit.repos.get({ owner, repo: repoName });
    return { repo: existingRepo, owner };
  } catch (err) {
    if (err.status === 404) {
      const { data: newRepo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: isPrivate,
        auto_init: true,
        description: description || 'Generated 9-Document Technical Suite by ClarifyAI'
      });
      return { repo: newRepo, owner };
    }
    throw err;
  }
}

async function pushDocumentsToRepo(token, { owner, repo, commitMessage, documents }) {
  const octokit = await getOctokit(token);
  const repoInfo = await octokit.repos.get({ owner, repo });
  const defaultBranch = repoInfo.data.default_branch || 'main';

  let refData;
  try {
    refData = (await octokit.git.getRef({ owner, repo, ref: `heads/${defaultBranch}` })).data;
  } catch {
    const { data: commits } = await octokit.repos.listCommits({ owner, repo, per_page: 1 });
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${defaultBranch}`, sha: commits[0].sha });
    refData = (await octokit.git.getRef({ owner, repo, ref: `heads/${defaultBranch}` })).data;
  }

  const baseTreeSha = refData.object.sha;
  const treeItems = await Promise.all(
    documents.map(async (doc) => {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(doc.content).toString('base64'),
        encoding: 'base64'
      });
      return { path: doc.path, mode: '100644', type: 'blob', sha: blob.sha };
    })
  );

  const { data: newTree } = await octokit.git.createTree({ owner, repo, base_tree: baseTreeSha, tree: treeItems });
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage || 'Sync 9-Document Technical Suite via ClarifyAI',
    tree: newTree.sha,
    parents: [baseTreeSha]
  });

  await octokit.git.updateRef({ owner, repo, ref: `heads/${defaultBranch}`, sha: newCommit.sha });
  return { repoUrl: repoInfo.data.html_url, commitSha: newCommit.sha, pushedAt: new Date() };
}

async function createOrUpdateWebhook(token, { owner, repo, webhookUrl, secret }) {
  const octokit = await getOctokit(token);
  try {
    const { data: hooks } = await octokit.repos.listWebhooks({ owner, repo });
    const existing = hooks.find(h => h.config && h.config.url === webhookUrl);
    if (existing) return { webhookId: existing.id };

    const { data: hook } = await octokit.repos.createWebhook({
      owner,
      repo,
      config: { url: webhookUrl, content_type: 'json', secret, insecure_ssl: '0' },
      events: ['push'],
      active: true
    });
    return { webhookId: hook.id };
  } catch (err) {
    return { webhookId: null, error: err.message };
  }
}

async function fetchRawFileContent(token, { owner, repo, path, branch = 'main' }) {
  const octokit = await getOctokit(token);
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if (data.content && data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf8');
    }
    return null;
  } catch (err) {
    return null;
  }
}

module.exports = {
  getAuthenticatedUser,
  createOrFetchRepo,
  pushDocumentsToRepo,
  createOrUpdateWebhook,
  fetchRawFileContent
};

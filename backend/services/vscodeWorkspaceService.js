const path = require('path');
const fs = require('fs').promises;

const initializeWorkspace = async (componentId, componentData = {}) => {
  const workspaceDir = path.resolve(__dirname, '..', 'workspaces', String(componentId));
  await fs.mkdir(workspaceDir, { recursive: true });

  const htmlContent = componentData?.code?.html || componentData?.html || '';
  const cssContent = componentData?.code?.css || componentData?.css || '';
  const metadata = {
    id: componentId,
    title: componentData?.title || 'Untitled Component',
    category: componentData?.category || 'General',
    framework: componentData?.framework || 'React',
    updatedAt: new Date().toISOString()
  };

  await fs.writeFile(path.join(workspaceDir, 'index.html'), htmlContent, 'utf8');
  await fs.writeFile(path.join(workspaceDir, 'styles.css'), cssContent, 'utf8');
  await fs.writeFile(path.join(workspaceDir, 'clarifyai.json'), JSON.stringify(metadata, null, 2), 'utf8');

  return workspaceDir;
};

module.exports = {
  initializeWorkspace
};

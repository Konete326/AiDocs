import JSZip from 'jszip';
import api from './api';

const docTypes = ['prd', 'srd', 'trd', 'architecture', 'api_schemas', 'database_schema', 'user_stories', 'tech_stack'];

export async function createClientSideZipStream(projectId, projectTitle, onProgress) {
  const zip = new JSZip();
  const folderName = (projectTitle || 'project').replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'project';
  const projectFolder = zip.folder(folderName);

  let successCount = 0;

  for (let i = 0; i < docTypes.length; i++) {
    const docType = docTypes[i];
    try {
      const response = await api.get(`/projects/${projectId}/export/${docType}/md`, { responseType: 'text' });
      if (response.data) {
        projectFolder.file(`${docType.toUpperCase()}.md`, response.data);
        successCount++;
      }
    } catch (err) {
    }
    if (onProgress) {
      onProgress(Math.round(((i + 1) / docTypes.length) * 50));
    }
  }

  if (successCount === 0) {
    throw new Error('No documents available for client-side archiving');
  }

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    },
    (metadata) => {
      if (onProgress) {
        onProgress(50 + Math.round(metadata.percent / 2));
      }
    }
  );

  return zipBlob;
}

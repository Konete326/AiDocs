import api from './api';

export async function downloadZip(projectId, projectTitle) {
  const response = await api.get(`/projects/${projectId}/export/zip`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectTitle.replace(/[^a-z0-9]/gi, '_')}_docs.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadDocAsPdf(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/export/${docType}/pdf`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data], { type: 'text/html' }));
  window.open(url, '_blank');
}

export async function downloadDocAsWord(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/export/${docType}/word`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${docType}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}

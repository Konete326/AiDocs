import api from './api';

export async function downloadZip(projectId, projectTitle) {
  const response = await api.get(`/projects/${projectId}/export/zip`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(projectTitle || 'project').replace(/[^a-z0-9]/gi, '_')}_docs.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadDocAsPdf(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/export/${docType}/pdf`, { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${docType}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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

export async function downloadDocAsExcel(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/export/${docType}/excel`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${docType}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadDocAsMd(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/export/${docType}/md`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([response.data], { type: 'text/markdown;charset=utf-8;' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${docType}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

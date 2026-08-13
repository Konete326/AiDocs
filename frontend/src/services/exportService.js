import api from './api';
import { toast } from 'react-hot-toast';
import { createClientSideZipStream } from './zipWorkerService';

export async function downloadZip(projectId, projectTitle) {
  const toastId = toast.loading('Building ZIP archive on background thread...');
  try {
    let blob;
    try {
      blob = await createClientSideZipStream(projectId, projectTitle, (percent) => {
        toast.loading(`Compressing ZIP archive (${percent}%)...`, { id: toastId });
      });
    } catch (clientErr) {
      const response = await api.get(`/projects/${projectId}/export/zip`, { responseType: 'blob' });
      blob = new Blob([response.data]);
    }

    const safeName = (projectTitle || 'project').replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'project';
    const timestamp = new Date().toISOString().split('T')[0];
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeName}_docs_${timestamp}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success('ZIP archive downloaded successfully!', { id: toastId });
  } catch (err) {
    toast.error('ZIP download failed. Please try again.', { id: toastId });
    throw err;
  }
}

export async function downloadDocAsPdf(projectId, docType) {
  const toastId = toast.loading(`Preparing ${docType.toUpperCase()} PDF...`);
  try {
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
    toast.success(`${docType.toUpperCase()} PDF downloaded!`, { id: toastId });
  } catch (err) {
    toast.error(`PDF download failed. Please try again.`, { id: toastId });
    throw err;
  }
}

export async function downloadDocAsWord(projectId, docType) {
  const toastId = toast.loading(`Preparing ${docType.toUpperCase()} DOCX...`);
  try {
    const response = await api.get(`/projects/${projectId}/export/${docType}/word`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType}.docx`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${docType.toUpperCase()} DOCX downloaded!`, { id: toastId });
  } catch (err) {
    toast.error(`DOCX download failed. Please try again.`, { id: toastId });
    throw err;
  }
}

export async function downloadDocAsExcel(projectId, docType) {
  const toastId = toast.loading(`Preparing ${docType.toUpperCase()} CSV...`);
  try {
    const response = await api.get(`/projects/${projectId}/export/${docType}/excel`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${docType.toUpperCase()} CSV downloaded!`, { id: toastId });
  } catch (err) {
    toast.error(`CSV download failed. Please try again.`, { id: toastId });
    throw err;
  }
}

export async function downloadDocAsMd(projectId, docType) {
  const toastId = toast.loading(`Preparing ${docType.toUpperCase()} Markdown...`);
  try {
    const response = await api.get(`/projects/${projectId}/export/${docType}/md`, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data], { type: 'text/markdown;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${docType.toUpperCase()} Markdown downloaded!`, { id: toastId });
  } catch (err) {
    toast.error(`Markdown download failed. Please try again.`, { id: toastId });
    throw err;
  }
}

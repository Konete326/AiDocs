import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const McpDeleteModal = ({ isOpen, onClose, onConfirm, deleting }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Revoke MCP API Key"
      message="Are you sure you want to revoke your MCP API key? Connected AI agents will immediately lose access."
      confirmLabel={deleting ? 'Revoking...' : 'Revoke Key'}
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onClose}
      isDangerous={true}
    />
  );
};

export default McpDeleteModal;

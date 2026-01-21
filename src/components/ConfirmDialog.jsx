// Modal de confirmación reutilizable
import React from 'react';

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="dialog-actions">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

import type { ReactNode } from "react";

type AdminEditModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function AdminEditModal({ title, children, onClose }: AdminEditModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="admin-edit-modal-title" onClick={(event) => event.stopPropagation()}>
        <div className="section-heading">
          <h2 id="admin-edit-modal-title">{title}</h2>
          <button type="button" className="plain-button" onClick={onClose}>
            閉じる
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

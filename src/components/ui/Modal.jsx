import { X } from "lucide-react";
import Button from "./Button.jsx";

export default function Modal({ open, title, children, footer, onClose }) {
  if (!open) return null;

  return (
    <div className="ds-modal-backdrop" onClick={onClose} role="presentation">
      <div className="ds-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="ds-modal-title">
        <div className="ds-modal__head">
          <h2 id="ds-modal-title" className="ds-h2">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </Button>
        </div>
        <div className="ds-modal__body">{children}</div>
        {footer ? <div className="ds-modal__foot">{footer}</div> : null}
      </div>
    </div>
  );
}

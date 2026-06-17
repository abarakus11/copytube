export function Field({ label, hint, error, children, className = "" }) {
  return (
    <div className={`ds-field ${className}`.trim()}>
      {label ? <label className="ds-field__label">{label}</label> : null}
      {children}
      {error ? <span className="ds-field__error">{error}</span> : hint ? <span className="ds-field__hint">{hint}</span> : null}
    </div>
  );
}

export function Input({ error, className = "", ...props }) {
  return <input className={`ds-input ${error ? "ds-input--error" : ""} ${className}`.trim()} {...props} />;
}

export function Textarea({ error, className = "", ...props }) {
  return <textarea className={`ds-textarea ${error ? "ds-input--error" : ""} ${className}`.trim()} {...props} />;
}

export function Select({ error, className = "", children, ...props }) {
  return (
    <select className={`ds-select ${error ? "ds-input--error" : ""} ${className}`.trim()} {...props}>
      {children}
    </select>
  );
}

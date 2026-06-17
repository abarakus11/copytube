export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="ds-empty">
      {icon ? <div className="ds-empty__icon">{icon}</div> : null}
      {title ? <p className="ds-h2" style={{ marginBottom: 8 }}>{title}</p> : null}
      {description ? <p className="ds-sub">{description}</p> : null}
      {action ? <div style={{ marginTop: 20 }}>{action}</div> : null}
    </div>
  );
}

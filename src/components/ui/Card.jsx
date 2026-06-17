export default function Card({ children, className = "", interactive = false, highlight = false, ...props }) {
  return (
    <div
      className={`ds-card ${interactive ? "ds-card--interactive" : ""} ${highlight ? "ds-card--highlight" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

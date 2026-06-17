import { Loader2 } from "lucide-react";

const variants = {
  default: "ds-btn",
  primary: "ds-btn ds-btn--primary",
  ghost: "ds-btn ds-btn--ghost",
};

const sizes = {
  md: "",
  sm: "ds-btn--sm",
  icon: "ds-btn--icon",
};

export default function Button({
  children,
  variant = "default",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      className={`${variants[variant] || variants.default} ${sizes[size] || ""} ${loading ? "ds-btn--loading" : ""} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 size={16} className="ds-spin" /> : null}
      {children}
    </button>
  );
}

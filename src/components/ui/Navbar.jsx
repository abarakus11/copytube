import { Menu } from "lucide-react";
import Button from "./Button.jsx";

export default function Navbar({ onMenuClick, title = "CopyTube" }) {
  return (
    <header className="ds-navbar">
      <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Abrir menu">
        <Menu size={20} />
      </Button>
      <span className="ds-h2" style={{ fontSize: "var(--ds-text-md)" }}>{title}</span>
      <div style={{ width: 36 }} />
    </header>
  );
}

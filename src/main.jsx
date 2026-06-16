import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CopyTube from "./CopyTube.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CopyTube />
  </StrictMode>
);

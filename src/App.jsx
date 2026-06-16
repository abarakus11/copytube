import { useState } from "react";
import { getSession, logout } from "./auth.js";
import AuthPage from "./AuthPage.jsx";
import CopyTube from "./CopyTube.jsx";

export default function App() {
  const [session, setSession] = useState(getSession);

  if (!session) {
    return <AuthPage onAuth={() => setSession(getSession())} />;
  }

  return (
    <CopyTube
      user={session}
      onLogout={() => {
        logout();
        setSession(null);
      }}
    />
  );
}

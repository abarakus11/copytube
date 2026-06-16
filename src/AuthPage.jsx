import { useState } from "react";
import { Play, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { login, register } from "./auth.js";

const AUTH_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&display=swap');
.ct-auth-root{
  --bg:#0A0B0F;--surface:#14161E;--border:#242834;--border2:#30353F;
  --text:#ECEEF3;--muted:#8A90A0;--faint:#5A5F6E;
  --violet:#7B5CFF;--mag:#C13BFF;--coral:#FF5B6E;--green:#2ed573;
  --grad:linear-gradient(135deg,#7B5CFF 0%,#C13BFF 52%,#FF5B6E 100%);
  --disp:'Space Grotesk',sans-serif;--body:'Inter',sans-serif;
  min-height:100vh;background:var(--bg);color:var(--text);font-family:var(--body);
  display:grid;place-items:center;padding:24px;
}
.ct-auth-root *{box-sizing:border-box}
.ct-auth-wrap{width:100%;max-width:420px}
.ct-auth-brand{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:28px}
.ct-auth-mark{width:36px;height:36px;border-radius:10px;background:var(--grad);display:grid;place-items:center;box-shadow:0 4px 16px rgba(123,92,255,.4)}
.ct-auth-brand b{font-family:var(--disp);font-size:22px;font-weight:700}
.ct-auth-brand span{color:var(--mag)}
.ct-auth-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px}
.ct-auth-tabs{display:flex;gap:4px;background:#0E1017;border:1px solid var(--border);border-radius:10px;padding:4px;margin-bottom:22px}
.ct-auth-tab{flex:1;text-align:center;padding:10px;border-radius:8px;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;transition:.15s}
.ct-auth-tab.on{color:var(--text);background:var(--surface);box-shadow:0 2px 8px rgba(0,0,0,.25)}
.ct-auth-field{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.ct-auth-field label{font-size:12.5px;font-weight:500;color:var(--text)}
.ct-auth-input{background:#0E1017;border:1px solid var(--border);border-radius:10px;padding:11px 13px;color:var(--text);font-family:var(--body);font-size:13.5px;width:100%;transition:.15s}
.ct-auth-input:focus{outline:none;border-color:var(--violet);box-shadow:0 0 0 3px rgba(123,92,255,.15)}
.ct-auth-input::placeholder{color:var(--faint)}
.ct-auth-btn{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;border:none;background:var(--grad);color:#fff;box-shadow:0 6px 20px rgba(123,92,255,.35);margin-top:6px}
.ct-auth-btn:disabled{opacity:.55;cursor:not-allowed}
.ct-auth-err{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;background:rgba(255,91,110,.1);border:1px solid rgba(255,91,110,.3);color:#ffb3bc;font-size:13px;margin-bottom:14px}
.ct-auth-sub{text-align:center;color:var(--muted);font-size:13px;margin-top:18px;line-height:1.5}
.ct-auth-sub button{background:none;border:none;color:var(--violet2,#9A82FF);font-weight:600;cursor:pointer;padding:0;font-size:13px}
.ct-auth-hint{text-align:center;color:var(--faint);font-size:12px;margin-top:20px}
`;

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setConfirm("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (password !== confirm) throw new Error("As senhas não coincidem");
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }
      onAuth();
    } catch (err) {
      setError(err.message || "Não foi possível continuar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ct-auth-root">
      <style>{AUTH_STYLE}</style>
      <div className="ct-auth-wrap">
        <div className="ct-auth-brand">
          <div className="ct-auth-mark"><Play size={16} fill="#fff" /></div>
          <b>Copy<span>Tube</span></b>
        </div>

        <div className="ct-auth-card">
          <div className="ct-auth-tabs">
            <div className={`ct-auth-tab ${mode === "login" ? "on" : ""}`} onClick={() => switchMode("login")}>
              Entrar
            </div>
            <div className={`ct-auth-tab ${mode === "signup" ? "on" : ""}`} onClick={() => switchMode("signup")}>
              Cadastrar
            </div>
          </div>

          <form onSubmit={submit}>
            {error && (
              <div className="ct-auth-err">
                <AlertTriangle size={15} /> {error}
              </div>
            )}

            {mode === "signup" && (
              <div className="ct-auth-field">
                <label>Nome</label>
                <input className="ct-auth-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
              </div>
            )}

            <div className="ct-auth-field">
              <label>E-mail</label>
              <input className="ct-auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
            </div>

            <div className="ct-auth-field">
              <label>Senha</label>
              <input className="ct-auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} />
            </div>

            {mode === "signup" && (
              <div className="ct-auth-field">
                <label>Confirmar senha</label>
                <input className="ct-auth-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repita a senha" required minLength={6} />
              </div>
            )}

            <button className="ct-auth-btn" type="submit" disabled={loading}>
              {loading ? <Loader2 size={16} className="ct-spin" style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={16} />}
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="ct-auth-sub">
            {mode === "login" ? (
              <>Não tem conta? <button type="button" onClick={() => switchMode("signup")}>Cadastre-se</button></>
            ) : (
              <>Já tem conta? <button type="button" onClick={() => switchMode("login")}>Fazer login</button></>
            )}
          </p>
        </div>

        <p className="ct-auth-hint">Produção de conteúdo com IA para YouTube, TikTok e mais.</p>
      </div>
    </div>
  );
}

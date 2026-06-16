import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard, Sparkles, FolderOpen, Play, Hash, FileText, Type,
  Share2, Copy, Download, Trash2, Plus, Loader2, Check, X, Clock,
  Target, Users, Gamepad2, Tag, TrendingUp, MousePointerClick, Radio,
  ChevronRight, Layers, Wand2, AlertTriangle,
  Youtube, Instagram, Linkedin, Facebook
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Theme                                                             */
/* ------------------------------------------------------------------ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.ct-root{
  --bg:#0A0B0F; --bg2:#0E1017; --surface:#14161E; --surface2:#1A1D27;
  --border:#242834; --border2:#30353F;
  --text:#ECEEF3; --muted:#8A90A0; --faint:#5A5F6E;
  --violet:#7B5CFF; --violet2:#9A82FF; --mag:#C13BFF; --coral:#FF5B6E;
  --grad:linear-gradient(135deg,#7B5CFF 0%,#C13BFF 52%,#FF5B6E 100%);
  --disp:'Space Grotesk',sans-serif; --body:'Inter',sans-serif; --mono:'JetBrains Mono',monospace;
  font-family:var(--body); color:var(--text); background:var(--bg);
  height:100%; min-height:100vh; -webkit-font-smoothing:antialiased; font-size:14px;
}
.ct-root *{box-sizing:border-box}
.ct-root::selection{background:rgba(123,92,255,.35)}

/* shell */
.ct-shell{display:grid;grid-template-columns:248px 1fr;min-height:100vh}
.ct-side{background:var(--bg2);border-right:1px solid var(--border);padding:20px 14px;display:flex;flex-direction:column;gap:6px;position:sticky;top:0;height:100vh}
.ct-brand{display:flex;align-items:center;gap:10px;padding:6px 8px 18px}
.ct-mark{width:30px;height:30px;border-radius:9px;background:var(--grad);display:grid;place-items:center;box-shadow:0 4px 16px rgba(123,92,255,.4)}
.ct-mark svg{color:#fff}
.ct-brand b{font-family:var(--disp);font-weight:700;font-size:16px;letter-spacing:-.02em}
.ct-brand span{color:var(--mag)}
.ct-navlbl{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);padding:14px 10px 6px;font-weight:600}
.ct-nav{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:9px;color:var(--muted);cursor:pointer;font-weight:500;border:1px solid transparent;transition:.15s}
.ct-nav:hover{color:var(--text);background:var(--surface)}
.ct-nav.on{color:var(--text);background:var(--surface);border-color:var(--border2)}
.ct-nav.on svg{color:var(--violet2)}
.ct-side-foot{margin-top:auto;padding:12px 10px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;color:var(--muted);font-size:12px}
.ct-avatar{width:28px;height:28px;border-radius:50%;background:var(--surface2);border:1px solid var(--border2);display:grid;place-items:center;font-family:var(--disp);font-weight:600;color:var(--text);flex-shrink:0}
.ct-usermeta{flex:1;min-width:0}
.ct-usermeta b{display:block;color:var(--text);font-weight:600;font-size:12.5px}
.ct-usermeta small{display:block;color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* main */
.ct-main{padding:32px 40px 60px;max-width:1180px;width:100%}
.ct-h1{font-family:var(--disp);font-size:26px;font-weight:600;letter-spacing:-.02em;margin:0}
.ct-sub{color:var(--muted);margin:6px 0 0;font-size:13px}
.ct-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;gap:20px;flex-wrap:wrap}

/* cards */
.ct-grid{display:grid;gap:16px}
.ct-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px}
.ct-stat{display:flex;flex-direction:column;gap:10px}
.ct-stat .ct-ico{width:34px;height:34px;border-radius:9px;background:var(--surface2);border:1px solid var(--border2);display:grid;place-items:center;color:var(--violet2)}
.ct-stat .ct-num{font-family:var(--disp);font-size:30px;font-weight:600;letter-spacing:-.02em;line-height:1}
.ct-stat .ct-lbl{color:var(--muted);font-size:12.5px}

/* buttons */
.ct-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;border:1px solid var(--border2);background:var(--surface);color:var(--text);transition:.15s;font-family:var(--body)}
.ct-btn:hover{background:var(--surface2)}
.ct-btn.primary{background:var(--grad);border:none;color:#fff;box-shadow:0 6px 20px rgba(123,92,255,.35)}
.ct-btn.primary:hover{filter:brightness(1.08)}
.ct-btn:disabled{opacity:.5;cursor:not-allowed}
.ct-btn.sm{padding:7px 11px;font-size:12px;border-radius:8px}
.ct-icobtn{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--muted);cursor:pointer}
.ct-icobtn:hover{color:var(--text);background:var(--surface2)}

/* form */
.ct-field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.ct-field label{font-size:12.5px;font-weight:500;color:var(--text);display:flex;align-items:center;gap:7px}
.ct-field label svg{color:var(--faint)}
.ct-input,.ct-select,.ct-area{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:11px 13px;color:var(--text);font-family:var(--body);font-size:13.5px;width:100%;transition:.15s}
.ct-input:focus,.ct-select:focus,.ct-area:focus{outline:none;border-color:var(--violet);box-shadow:0 0 0 3px rgba(123,92,255,.15)}
.ct-input::placeholder,.ct-area::placeholder{color:var(--faint)}
.ct-area{resize:vertical;min-height:64px}
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.ct-pchips{display:flex;flex-wrap:wrap;gap:8px}
.ct-pchip{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border-radius:9px;border:1px solid var(--border);background:var(--bg2);color:var(--muted);cursor:pointer;font-size:12.5px;font-weight:500;transition:.2s ease;user-select:none}
.ct-pchip:hover{color:var(--text);border-color:var(--border2);background:var(--surface)}
.ct-pchip .dot{width:8px;height:8px;border-radius:50%;transition:box-shadow .2s ease}
.ct-picon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0}
.ct-picon svg{display:block}
.ct-pchip.on .ct-picon{filter:drop-shadow(0 0 5px currentColor)}
.ct-pchip.on{color:#d7ffe4;border-color:#2ed573;background:rgba(46,213,115,.14);box-shadow:0 0 0 1px rgba(46,213,115,.55),0 0 14px rgba(46,213,115,.45),inset 0 0 10px rgba(46,213,115,.12)}
.ct-pchip.on .dot{box-shadow:0 0 10px currentColor,0 0 4px #2ed573}

/* tabs */
.ct-tabs{display:flex;gap:4px;border-bottom:1px solid var(--border);margin-bottom:24px;flex-wrap:wrap}
.ct-tab{display:flex;align-items:center;gap:8px;padding:11px 14px;color:var(--muted);cursor:pointer;font-weight:500;font-size:13px;border-bottom:2px solid transparent;margin-bottom:-1px;transition:.15s}
.ct-tab:hover{color:var(--text)}
.ct-tab.on{color:var(--text);border-bottom-color:var(--mag)}

/* timeline (signature) */
.ct-tl{position:relative;padding-left:28px}
.ct-tl:before{content:"";position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:linear-gradient(var(--violet),var(--mag),var(--coral))}
.ct-tlitem{position:relative;padding:0 0 22px 14px}
.ct-tldot{position:absolute;left:-28px;top:3px;width:16px;height:16px;border-radius:50%;background:var(--surface2);border:2px solid var(--violet2);z-index:1}
.ct-tlitem.hook .ct-tldot{background:var(--coral);border-color:var(--coral);box-shadow:0 0 0 4px rgba(255,91,110,.18)}
.ct-tltime{font-family:var(--mono);font-size:12px;color:var(--violet2);font-weight:500;display:flex;align-items:center;gap:8px;margin-bottom:5px}
.ct-tlitem.hook .ct-tltime{color:var(--coral)}
.ct-rec{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;background:rgba(255,91,110,.15);color:var(--coral);padding:2px 6px;border-radius:5px;font-weight:500}
.ct-tltitle{font-family:var(--disp);font-weight:600;font-size:14.5px;margin:0 0 4px}
.ct-tlbody{color:var(--muted);font-size:13.5px;line-height:1.62;margin:0}

/* title list */
.ct-titrow{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid var(--border)}
.ct-titrow:last-child{border:none}
.ct-titnum{font-family:var(--mono);font-size:11px;color:var(--faint);width:20px}
.ct-tittxt{flex:1;font-size:13.5px;font-weight:450}
.ct-metrics{display:flex;gap:14px;flex-shrink:0}
.ct-metric{display:flex;flex-direction:column;gap:4px;align-items:center;width:46px}
.ct-metric .mlbl{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
.ct-bar{height:4px;width:100%;background:var(--border);border-radius:3px;overflow:hidden}
.ct-bar i{display:block;height:100%;border-radius:3px}

/* hashtags */
.ct-tags{display:flex;flex-wrap:wrap;gap:8px}
.ct-tagchip{font-family:var(--mono);font-size:12px;background:var(--bg2);border:1px solid var(--border);color:var(--violet2);padding:6px 11px;border-radius:8px;cursor:pointer;transition:.15s}
.ct-tagchip:hover{border-color:var(--violet);color:var(--text)}

/* platform desc */
.ct-platcard{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:14px}
.ct-plattop{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid var(--border)}
.ct-platname{display:flex;align-items:center;gap:9px;font-family:var(--disp);font-weight:600;font-size:14px}
.ct-platbody{padding:16px;color:var(--muted);font-size:13.5px;line-height:1.65;white-space:pre-wrap}

/* generation progress */
.ct-gen{display:flex;flex-direction:column;gap:2px;max-width:420px;margin:40px auto;text-align:left}
.ct-step{display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:12px;border:1px solid var(--border);background:var(--surface);transition:.2s}
.ct-step.active{border-color:var(--violet);box-shadow:0 0 0 3px rgba(123,92,255,.12)}
.ct-step .sico{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:var(--surface2);color:var(--faint);flex-shrink:0}
.ct-step.active .sico{background:rgba(123,92,255,.15);color:var(--violet2)}
.ct-step.done .sico{background:rgba(46,213,115,.12);color:#2ed573}
.ct-step b{font-size:13.5px;display:block;font-weight:600}
.ct-step small{color:var(--muted);font-size:12px}
.ct-spin{animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* misc */
.ct-empty{text-align:center;padding:60px 20px;color:var(--muted)}
.ct-empty .eico{width:54px;height:54px;border-radius:14px;background:var(--surface);border:1px solid var(--border);display:grid;place-items:center;margin:0 auto 16px;color:var(--violet2)}
.ct-projrow{display:flex;align-items:center;gap:16px;padding:16px;border:1px solid var(--border);border-radius:12px;background:var(--surface);margin-bottom:10px;cursor:pointer;transition:.15s}
.ct-projrow:hover{border-color:var(--border2);background:var(--surface2)}
.ct-projmeta{flex:1;min-width:0}
.ct-projmeta b{font-family:var(--disp);font-weight:600;font-size:14.5px;display:block}
.ct-projmeta small{color:var(--muted);font-size:12px}
.ct-mini{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.ct-pill{font-size:10.5px;color:var(--muted);background:var(--bg2);border:1px solid var(--border);padding:2px 8px;border-radius:6px}
.ct-pill-plat{display:inline-flex;align-items:center;gap:5px}
.ct-banner{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;background:rgba(255,91,110,.1);border:1px solid rgba(255,91,110,.3);color:#ffb3bc;font-size:13px;margin-bottom:18px}
.ct-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--surface2);border:1px solid var(--border2);color:var(--text);padding:11px 18px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 12px 40px rgba(0,0,0,.5);display:flex;align-items:center;gap:9px;z-index:99}
.ct-sectlbl{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);font-weight:600;margin:0 0 12px}
@media(max-width:820px){.ct-shell{grid-template-columns:1fr}.ct-side{display:none}.ct-main{padding:24px 18px 60px}.ct-row{grid-template-columns:1fr}}
`;

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */
function TikTokIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const PLATFORMS = [
  { id: "youtube", label: "YouTube", color: "#FF0000", Icon: Youtube },
  { id: "tiktok", label: "TikTok", color: "#00F2EA", Icon: TikTokIcon },
  { id: "instagram", label: "Instagram", color: "#E4405F", Icon: Instagram },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", Icon: Linkedin },
  { id: "facebook", label: "Facebook", color: "#1877F2", Icon: Facebook },
];
const PLAT = Object.fromEntries(PLATFORMS.map((p) => [p.id, p]));

function PlatIcon({ id, size = 16, className = "" }) {
  const p = PLAT[id];
  if (!p?.Icon) return null;
  const Icon = p.Icon;
  return (
    <span className={`ct-picon ${className}`.trim()} style={{ color: p.color }}>
      <Icon size={size} />
    </span>
  );
}

const STORAGE_KEY = "copytube-projects";

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function countAssets(content = {}) {
  let n = 0;
  if (content.roteiro) n += 1;
  if (content.titulos) {
    n += ["virais", "seo", "ctr"].reduce((s, k) => s + (content.titulos[k]?.length || 0), 0);
  }
  if (content.hashtags) {
    n += ["top", "nicho", "virais"].reduce((s, k) => s + (content.hashtags[k]?.length || 0), 0);
    n += content.hashtags.plataformas
      ? Object.values(content.hashtags.plataformas).reduce((s, arr) => s + (arr?.length || 0), 0)
      : 0;
  }
  if (content.descricoes) n += Object.values(content.descricoes).filter(Boolean).length;
  return n;
}

function computeStats(projects) {
  const assets = projects.reduce((n, p) => n + countAssets(p.content), 0);
  const nets = new Set();
  projects.forEach((p) => (p.plataformas || []).forEach((x) => nets.add(x)));

  const scores = [];
  projects.forEach((p) => {
    const t = p.content?.titulos;
    if (!t) return;
    ["virais", "seo", "ctr"].forEach((k) => {
      (t[k] || []).forEach((item) => {
        if (item.seo != null && item.eng != null && item.ctr != null) {
          scores.push((item.seo + item.eng + item.ctr) / 3);
        }
      });
    });
  });
  const potencialMedio = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;

  return { projetos: projects.length, assets, redes: nets.size, potencialMedio };
}

/* ------------------------------------------------------------------ */
/*  AI layer                                                          */
/* ------------------------------------------------------------------ */
function fmtMin(m) {
  const mins = Math.floor(m);
  const secs = Math.round((m - mins) * 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function tagFrom(text) {
  const base = (text || "").replace(/[^a-zA-Z0-9\u00C0-\u024F ]/g, "").trim().split(/\s+/)[0] || "Conteudo";
  return "#" + base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
}

function buildRoteiroBlocos(f) {
  const tema = f.tema || f.titulo || "o tema";
  const obj = (f.objetivo || "dominar o assunto").trim();
  const pub = (f.publico || "quem está começando").split(",")[0].trim();
  const nicho = f.nicho || "conteúdo";
  const n = Math.min(6, Math.max(4, Math.round((f.duracao || 10) / 3)));
  const blockDur = f.duracao / n;

  const segments = [
    {
      titulo: "O erro que trava a maioria",
      fala: `Em ${tema}, o erro mais comum é querer pular etapas. Para ${pub}, isso trava tudo antes de ${obj.toLowerCase()}. Mostro onde a maioria erra e o primeiro ajuste para corrigir agora.`,
    },
    {
      titulo: "O passo a passo prático",
      fala: `Agora mão na massa: vou ${obj.toLowerCase()} em ordem lógica. Começo pelo essencial de ${tema} e avanço passo a passo — você acompanha e entende cada movimento junto comigo.`,
    },
    {
      titulo: "A estratégia que realmente funciona",
      fala: `Esta é a parte que muda o jogo em ${nicho}. Explico a estratégia para ${obj.toLowerCase()} com foco em ${tema}: o que priorizar, o que cortar e por que essa ordem funciona.`,
    },
    {
      titulo: "Armadilhas e como evitar",
      fala: `Três armadilhas que vi ${pub} cair em ${tema}. Para cada uma, mostro o sinal de alerta e a correção na hora — assim você não refaz trabalho à toa.`,
    },
    {
      titulo: "Prova e resultados",
      fala: `Hora da prova: aplico ao vivo o que vimos em ${tema}. Você vê o antes e depois e como isso se conecta com ${obj.toLowerCase()} de forma concreta.`,
    },
    {
      titulo: "Plano para aplicar hoje",
      fala: `Fechamento: resumo em sequência clara o que fazer hoje sobre ${tema}. Se você é ${pub}, sai deste vídeo com um mini-plano para executar ainda hoje.`,
    },
  ];

  return Array.from({ length: n }, (_, i) => {
    const seg = segments[i];
    const start = i * blockDur;
    const end = i === n - 1 ? f.duracao : (i + 1) * blockDur;
    return {
      tempo: `${fmtMin(start)} – ${fmtMin(end)}`,
      titulo: seg.titulo,
      fala: seg.fala,
    };
  });
}

function normalizeRoteiro(roteiro, f) {
  const localBlocos = buildRoteiroBlocos(f);
  if (!roteiro) {
    const tema = f.tema || f.titulo;
    return {
      gancho: `Você já tentou ${tema} e não viu resultado? Em ${f.duracao} minutos mostro como ${(f.objetivo || "").toLowerCase()} — direto ao ponto.`,
      introducao: `Fala! Hoje o tema é ${tema}${f.jogo ? ` (${f.jogo})` : ""}. Objetivo: ${f.objetivo}. Se você é ${f.publico}, fica até o final.`,
      blocos: localBlocos,
      cta: `Curtiu? Deixa o like, se inscreve e comenta o que quer ver sobre ${tema} no próximo vídeo!`,
    };
  }

  const raw = (roteiro.blocos || []).length ? roteiro.blocos : localBlocos;
  const seen = new Set();
  const blocos = raw.map((b, i) => {
    const fala = (b.fala || "").trim();
    const key = fala.toLowerCase().replace(/\s+/g, " ").slice(0, 80);
    const dup = !fala || fala.length < 35 || seen.has(key);
    if (fala && !dup) seen.add(key);
    const local = localBlocos[i] || localBlocos[localBlocos.length - 1];
    return {
      tempo: b.tempo || local.tempo,
      titulo: (b.titulo || local.titulo).trim(),
      fala: dup ? local.fala : fala,
    };
  });

  while (blocos.length < localBlocos.length) blocos.push(localBlocos[blocos.length]);

  const tema = f.tema || f.titulo;
  return {
    gancho: (roteiro.gancho || "").trim() || `Você já tentou ${tema} e não viu resultado? Em ${f.duracao} minutos mostro como ${(f.objetivo || "").toLowerCase()} — direto ao ponto.`,
    introducao: (roteiro.introducao || "").trim() || `Fala! Hoje o tema é ${tema}${f.jogo ? ` (${f.jogo})` : ""}. Objetivo: ${f.objetivo}. Se você é ${f.publico}, fica até o final.`,
    blocos: blocos.slice(0, localBlocos.length),
    cta: (roteiro.cta || "").trim() || `Curtiu? Deixa o like, se inscreve e comenta o que quer ver sobre ${tema} no próximo vídeo!`,
  };
}

function generateLocal(step, f) {
  const tema = f.tema || f.titulo;
  const jogo = f.jogo || tema;
  const n = Math.min(6, Math.max(4, Math.round(f.duracao / 3)));
  const blockDur = f.duracao / n;
  const blocoTitulos = [
    "O erro que trava a maioria",
    "O passo a passo prático",
    "A estratégia que realmente funciona",
    "Armadilhas e como evitar",
    "Prova e resultados",
    "Plano para aplicar hoje",
  ];

  if (step === "roteiro") {
    return normalizeRoteiro(null, f);
  }

  if (step === "titulos") {
    const mk = (t, seo, eng, ctr) => ({ t, seo, eng, ctr });
    return {
      virais: [
        mk(`${tema}: o método que mudou tudo (em ${f.duracao} min)`, 72, 91, 89),
        mk(`Pare de errar em ${tema} — faça ISSO primeiro`, 68, 88, 86),
        mk(`Do zero ao resultado em ${tema} (sem enrolação)`, 70, 90, 87),
        mk(`Ninguém te conta isso sobre ${tema}`, 66, 92, 88),
        mk(`${f.duracao} min que valem mais que horas de teoria`, 64, 85, 84),
        mk(`Testei e funcionou: ${f.objetivo}`, 62, 87, 86),
      ],
      seo: [
        mk(`Como ${f.objetivo.toLowerCase()} — guia completo ${tema}`, 94, 72, 76),
        mk(`${tema}: tutorial passo a passo para iniciantes`, 92, 70, 74),
        mk(`Guia de ${tema} em ${f.duracao} minutos (${f.nicho})`, 90, 68, 72),
        mk(`${tema} para ${f.publico.split(",")[0] || "iniciantes"}`, 88, 66, 70),
        mk(`Melhor forma de ${f.objetivo.toLowerCase()} em ${tema}`, 86, 65, 69),
        mk(`${tema} — dicas práticas ${new Date().getFullYear()}`, 84, 64, 68),
      ],
      ctr: [
        mk(`${f.duracao} min = resultado em ${tema} 🔥`, 65, 86, 92),
        mk(`Isso em ${tema} é quase trapaça (funciona)`, 60, 89, 91),
        mk(`Iniciante? ${tema} do jeito certo`, 67, 83, 88),
        mk(`O segredo de ${tema} que poucos usam`, 63, 84, 87),
        mk(`Eu faria ISSO antes de qualquer coisa em ${tema}`, 66, 82, 85),
        mk(`${tema}: erro #1 que te impede de evoluir`, 69, 80, 86),
      ],
    };
  }

  if (step === "hashtags") {
    const top = [tagFrom(tema), tagFrom(jogo), tagFrom(f.nicho), "#ConteudoBR", "#Dicas"];
    const nicho = [tagFrom(f.nicho), tagFrom(f.objetivo), tagFrom(tema + "Brasil"), "#Tutorial", "#Guia"];
    const virais = ["#FYP", "#Viral", "#DicasRapidas", "#Conteudo", "#Creator"];
    const platDefaults = {
      youtube: [tagFrom(tema), "#Tutorial", "#GuiaCompleto", tagFrom(f.nicho)],
      tiktok: [tagFrom(tema).toLowerCase(), "#fyp", "#viral", tagFrom(f.nicho).toLowerCase()],
      instagram: [tagFrom(tema).toLowerCase(), "#reels", "#dicas", tagFrom(f.nicho).toLowerCase()],
      linkedin: [tagFrom(tema), "#Carreira", "#Aprendizado", tagFrom(f.nicho)],
      facebook: [tagFrom(tema), "#Dicas", "#Compartilhe", tagFrom(f.nicho)],
    };
    const plataformas = Object.fromEntries(
      f.plataformas.map((p) => [p, platDefaults[p] || [tagFrom(tema), "#Conteudo"]])
    );
    return { top, nicho, virais, plataformas };
  }

  if (step === "descricoes") {
    const caps = Array.from({ length: n }, (_, i) => {
      const start = i * blockDur;
      return `${fmtMin(start)} ${blocoTitulos[i]}`;
    }).join("\n");
    const desc = {
      youtube: `🎯 ${f.titulo}\n\n${f.objetivo} Neste vídeo de ${f.duracao} min sobre ${tema}, mostro o passo a passo para ${f.publico}.\n\n⏱️ CAPÍTULOS\n${caps}\n\n👉 Inscreva-se para mais conteúdo de ${f.nicho}!`,
      tiktok: `${tema} em ${f.duracao} min 🔥 ${f.objetivo.slice(0, 60)}… salva e segue! ${tagFrom(tema).toLowerCase()} #fyp`,
      instagram: `${f.objetivo} 💡 ${tema} explicado de forma simples. Salva esse post e marca quem precisa ver! 👇`,
      linkedin: `${f.titulo}\n\nCompartilho aprendizados práticos sobre ${tema} para ${f.publico}.\n\nObjetivo: ${f.objetivo}\n\n#${f.nicho.replace(/\W+/g, "")} #Aprendizado`,
      facebook: `Novo conteúdo sobre ${tema}! ${f.objetivo} Assista, compartilhe com quem precisa e comenta sua dúvida 👇`,
    };
    return Object.fromEntries(f.plataformas.map((p) => [p, desc[p] || desc.youtube]));
  }

  throw new Error(`step desconhecido: ${step}`);
}

function parseAIJson(text) {
  const clean = (text || "").replace(/```json/gi, "").replace(/```/g, "").trim();
  const s = clean.indexOf("{"), e = clean.lastIndexOf("}");
  if (s === -1 || e === -1) throw new Error("Resposta sem JSON");
  return JSON.parse(clean.slice(s, e + 1));
}

async function apiConfigured() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    return !!data.ok;
  } catch {
    return false;
  }
}

async function callAI(system, user) {
  const payload = {
    max_tokens: 4096,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };

  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || `Erro HTTP ${res.status}`);
      const text = data.choices?.[0]?.message?.content || "";
      if (!text.trim()) throw new Error("Resposta vazia da IA");
      return parseAIJson(text);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

const ctx = (f) =>
  `Projeto: ${f.titulo}\nTema: ${f.tema}${f.jogo ? `\nJogo: ${f.jogo}` : ""}\nNicho: ${f.nicho}\nObjetivo: ${f.objetivo}\nPúblico-alvo: ${f.publico}\nDuração: ${f.duracao} min\nPlataformas: ${f.plataformas.join(", ")}`;

const STEPS = [
  { id: "roteiro", icon: Play, label: "Roteiro", desc: "Gancho, blocos por tempo e CTA" },
  { id: "titulos", icon: Type, label: "Títulos", desc: "Virais, SEO e alta-CTR com métricas" },
  { id: "hashtags", icon: Hash, label: "Hashtags", desc: "Top, nicho, virais e por plataforma" },
  { id: "descricoes", icon: FileText, label: "Descrições", desc: "Adaptadas a cada rede social" },
];

async function runGeneration(f, onStep, onMode) {
  const out = { roteiro: null, titulos: null, hashtags: null, descricoes: null };
  const hasApi = await apiConfigured();
  let aiSteps = 0;
  const tasks = {
    roteiro: () =>
      callAI(
        "Você é roteirista profissional de vídeos para redes sociais e copywriter de resposta direta. Escreva com linguagem natural de fala, ganchos fortes e tom adequado ao público. Responda SOMENTE com JSON minificado válido, sem markdown e sem texto fora do JSON.",
        `${ctx(f)}\n\nGere o roteiro em português do Brasil para ${f.duracao} minutos.\n\nREGRAS OBRIGATÓRIAS:\n- Divida em 4 a 6 blocos sequenciais com tempos contínuos de 0:00 até o fim do vídeo.\n- Cada bloco precisa de título DIFERENTE e fala ÚNICA (2 a 4 frases em tom de fala ao câmera).\n- Progressão narrativa: problema → passo a passo → estratégia → armadilhas → prova → plano de ação.\n- NUNCA repita a mesma frase, parágrafo ou ideia em blocos diferentes.\n- O gancho deve prender nos primeiros 5 segundos; o CTA deve pedir like, inscrição e comentário.\n\nFormato:\n{"gancho":"...","introducao":"...","blocos":[{"tempo":"0:00 – 3:00","titulo":"...","fala":"..."}],"cta":"..."}`
      ),
    titulos: () =>
      callAI(
        "Você é especialista em títulos virais e SEO para vídeo. Responda SOMENTE com JSON minificado válido, sem markdown.",
        `${ctx(f)}\n\nGere títulos em português. 6 por categoria. seo/eng/ctr são números 0-100 (potencial estimado). Formato:\n{"virais":[{"t":"...","seo":80,"eng":90,"ctr":85}],"seo":[...6...],"ctr":[...6...]}`
      ),
    hashtags: () =>
      callAI(
        "Você é estrategista de hashtags para redes sociais. Responda SOMENTE com JSON minificado válido, sem markdown.",
        `${ctx(f)}\n\nGere hashtags (com #). Formato:\n{"top":["#..."],"nicho":["#..."],"virais":["#..."],"plataformas":{"youtube":["#..."],"tiktok":["#..."],"instagram":["#..."]}}`
      ),
    descricoes: () => {
      const keys = f.plataformas.join(", ");
      return callAI(
        "Você é copywriter especialista em adaptar conteúdo às características de cada rede social: YouTube (descrição longa, capítulos, SEO), TikTok (curto, gírias, trends), Instagram (emocional, CTA forte), LinkedIn (profissional, autoridade), Facebook (engajamento e compartilhamento). Responda SOMENTE com JSON minificado válido, sem markdown.",
        `${ctx(f)}\n\nGere uma descrição para CADA uma destas plataformas: ${keys}. Respeite o estilo de cada uma. Use \\n para quebras de linha. Formato (inclua só as chaves pedidas):\n{${f.plataformas.map((p) => `"${p}":"..."`).join(",")}}`
      );
    },
  };
  for (const step of STEPS) {
    onStep(step.id, "active");
    try {
      const raw = await tasks[step.id]();
      out[step.id] = step.id === "roteiro" ? normalizeRoteiro(raw, f) : raw;
      aiSteps += 1;
      onStep(step.id, "done");
    } catch {
      try {
        const local = generateLocal(step.id, f);
        out[step.id] = step.id === "roteiro" ? normalizeRoteiro(local, f) : local;
        onStep(step.id, "done");
      } catch {
        onStep(step.id, "error");
      }
    }
  }
  onMode?.(hasApi ? (aiSteps === STEPS.length ? "ai" : aiSteps > 0 ? "partial" : "failed") : "local");
  return out;
}

/* ------------------------------------------------------------------ */
/*  Small UI helpers                                                  */
/* ------------------------------------------------------------------ */
const metricColor = (v) => (v >= 85 ? "#2ed573" : v >= 70 ? "#7B5CFF" : "#FF9F43");

function Metric({ label, v }) {
  return (
    <div className="ct-metric">
      <span className="mlbl">{label}</span>
      <div className="ct-bar"><i style={{ width: `${v}%`, background: metricColor(v) }} /></div>
    </div>
  );
}

function buildMarkdown(p) {
  const c = p.content || {};
  let m = `# ${p.titulo}\n\n**Tema:** ${p.tema}  |  **Duração:** ${p.duracao} min\n**Objetivo:** ${p.objetivo}\n**Público:** ${p.publico}\n\n`;
  if (c.roteiro) {
    m += `## Roteiro\n\n**Gancho:** ${c.roteiro.gancho}\n\n**Introdução:** ${c.roteiro.introducao}\n\n`;
    (c.roteiro.blocos || []).forEach((b) => (m += `### ${b.tempo} — ${b.titulo}\n${b.fala}\n\n`));
    m += `**CTA:** ${c.roteiro.cta}\n\n`;
  }
  if (c.titulos) {
    m += `## Títulos\n`;
    ["virais", "seo", "ctr"].forEach((k) => {
      m += `\n**${k.toUpperCase()}**\n`;
      (c.titulos[k] || []).forEach((t, i) => (m += `${i + 1}. ${t.t}  _(SEO ${t.seo} · Eng ${t.eng} · CTR ${t.ctr})_\n`));
    });
  }
  if (c.hashtags) {
    m += `\n## Hashtags\n`;
    ["top", "nicho", "virais"].forEach((k) => (c.hashtags[k] ? (m += `**${k}:** ${c.hashtags[k].join(" ")}\n`) : null));
  }
  if (c.descricoes) {
    m += `\n## Descrições\n`;
    Object.entries(c.descricoes).forEach(([k, v]) => v && (m += `\n### ${PLAT[k]?.label || k}\n${v}\n`));
  }
  return m;
}

function download(name, text) {
  const b = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(b);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */
export default function CopyTube() {
  const [view, setView] = useState("dashboard");
  const [projects, setProjects] = useState(loadProjects);
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState("");
  const toastT = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const ping = (msg) => {
    setToast(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(""), 2000);
  };
  const copy = (txt, msg = "Copiado") => {
    try { navigator.clipboard.writeText(txt); } catch (e) {}
    ping(msg);
  };

  const active = projects.find((p) => p.id === activeId);

  const stats = useMemo(() => computeStats(projects), [projects]);

  const openProject = (id) => { setActiveId(id); setView("results"); };
  const removeProject = (id) => { setProjects((ps) => ps.filter((p) => p.id !== id)); ping("Projeto excluído"); };
  const dupProject = (id) => {
    const p = projects.find((x) => x.id === id);
    setProjects((ps) => [{ ...p, id: "p" + Date.now(), titulo: p.titulo + " (cópia)", createdAt: Date.now() }, ...ps]);
    ping("Projeto duplicado");
  };

  return (
    <div className="ct-root">
      <style>{STYLE}</style>
      <div className="ct-shell">
        {/* Sidebar */}
        <aside className="ct-side">
          <div className="ct-brand">
            <div className="ct-mark"><Play size={15} fill="#fff" /></div>
            <b>Copy<span>Tube</span></b>
          </div>
          <div className="ct-navlbl">Espaço</div>
          {[
            ["dashboard", LayoutDashboard, "Dashboard"],
            ["generator", Sparkles, "Gerar conteúdo"],
            ["library", FolderOpen, "Biblioteca"],
          ].map(([id, Ico, lbl]) => (
            <div key={id} className={`ct-nav ${view === id || (id === "library" && view === "results") ? "on" : ""}`}
                 onClick={() => { setView(id); if (id !== "results") setActiveId(id === "library" ? activeId : null); }}>
              <Ico size={17} /> {lbl}
            </div>
          ))}
          <div className="ct-navlbl">Conectado</div>
          {PLATFORMS.map((p) => (
            <div key={p.id} className="ct-nav" style={{ cursor: "default" }}>
              <PlatIcon id={p.id} size={14} /> {p.label}
            </div>
          ))}
          <div className="ct-side-foot">
            <div className="ct-avatar">C</div>
            <div className="ct-usermeta">
              <b>Criador</b>
              <small>CopyTube</small>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="ct-main">
          {view === "dashboard" && <Dashboard stats={stats} onNew={() => setView("generator")} />}
          {view === "generator" && (
            <Generator
              ping={ping}
              onDone={(proj) => {
                setProjects((ps) => [proj, ...ps]);
                setActiveId(proj.id);
                setView("results");
                ping(proj.genMode === "ai" ? "Conteúdo gerado com IA" : proj.genMode === "partial" ? "Conteúdo gerado (parcial)" : "Conteúdo gerado");
              }}
            />
          )}
          {view === "library" && <Library projects={projects} onOpen={openProject} onDup={dupProject} onDel={removeProject} onNew={() => setView("generator")} />}
          {view === "results" && active && <Results p={active} copy={copy} ping={ping} />}
          {view === "results" && !active && <div className="ct-empty">Selecione um projeto na biblioteca.</div>}
        </main>
      </div>
      {toast && <div className="ct-toast"><Check size={15} style={{ color: "#2ed573" }} /> {toast}</div>}
    </div>
  );
}

/* ----------------------------- Dashboard --------------------------- */
function Dashboard({ stats, onNew }) {
  const cards = [
    { ico: <Layers size={17} />, num: stats.projetos, lbl: "Projetos" },
    { ico: <Wand2 size={17} />, num: stats.assets, lbl: "Conteúdos gerados" },
    { ico: <Share2 size={17} />, num: stats.redes, lbl: "Redes conectadas" },
    { ico: <TrendingUp size={17} />, num: stats.potencialMedio != null ? `${stats.potencialMedio}%` : "—", lbl: "Potencial médio" },
  ];
  return (
    <>
      <div className="ct-head">
        <div><h1 className="ct-h1">Dashboard</h1><p className="ct-sub">Sua central de produção de conteúdo com IA.</p></div>
        <button className="ct-btn primary" onClick={onNew}><Plus size={16} /> Novo conteúdo</button>
      </div>
      <div className="ct-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {cards.map((c, i) => (
          <div key={i} className="ct-card ct-stat">
            <div className="ct-ico">{c.ico}</div>
            <div className="ct-num">{c.num}</div>
            <div className="ct-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ----------------------------- Generator --------------------------- */
function Generator({ onDone, ping }) {
  const [f, setF] = useState({
    titulo: "",
    tema: "",
    jogo: "",
    nicho: "",
    objetivo: "",
    publico: "",
    duracao: 10,
    plataformas: [],
  });
  const [progress, setProgress] = useState(null); // {roteiro:'active'...}
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const togglePlat = (id) =>
    setF((s) => ({ ...s, plataformas: s.plataformas.includes(id) ? s.plataformas.filter((x) => x !== id) : [...s.plataformas, id] }));

  const generating = !!progress;

  const start = async () => {
    if (!f.titulo || !f.tema || f.plataformas.length === 0) return;
    const init = {};
    STEPS.forEach((s) => (init[s.id] = "idle"));
    setProgress(init);
    let genMode = "ai";
    const content = await runGeneration(
      f,
      (id, status) => setProgress((p) => ({ ...p, [id]: status })),
      (mode) => { genMode = mode; }
    );
    const hasContent = Object.values(content).some(Boolean);
    if (!hasContent) {
      ping("Falha na geração. Rode npm run dev e tente novamente.");
      setProgress(null);
      return;
    }
    onDone({ ...f, id: "p" + Date.now(), createdAt: Date.now(), content, genMode });
  };

  if (generating) {
    return (
      <>
        <div className="ct-head"><div><h1 className="ct-h1">Gerando conteúdo</h1><p className="ct-sub">A IA está produzindo cada peça para "{f.titulo}".</p></div></div>
        <div className="ct-gen">
          {STEPS.map((s) => {
            const st = progress[s.id];
            const Ico = s.icon;
            return (
              <div key={s.id} className={`ct-step ${st === "active" ? "active" : st === "done" ? "done" : ""}`}>
                <div className="sico">
                  {st === "active" ? <Loader2 size={16} className="ct-spin" /> : st === "done" ? <Check size={16} /> : st === "error" ? <AlertTriangle size={16} style={{ color: "var(--coral)" }} /> : <Ico size={15} />}
                </div>
                <div><b>{s.label}</b><small>{st === "error" ? "Falha na API — gere novamente" : s.desc}</small></div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ct-head"><div><h1 className="ct-h1">Gerar conteúdo</h1><p className="ct-sub">Descreva seu vídeo. A IA cria o resto.</p></div></div>
      <div className="ct-card" style={{ maxWidth: 720 }}>
        <div className="ct-field">
          <label><Tag size={14} /> Título do projeto</label>
          <input className="ct-input" value={f.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ex.: Guia completo para iniciantes" />
        </div>
        <div className="ct-row">
          <div className="ct-field">
            <label><Sparkles size={14} /> Tema principal</label>
            <input className="ct-input" value={f.tema} onChange={(e) => set("tema", e.target.value)} placeholder="Sobre o que é o vídeo" />
          </div>
          <div className="ct-field">
            <label><Gamepad2 size={14} /> Jogo (se for gamer)</label>
            <input className="ct-input" value={f.jogo} onChange={(e) => set("jogo", e.target.value)} placeholder="Opcional" />
          </div>
        </div>
        <div className="ct-row">
          <div className="ct-field">
            <label><Layers size={14} /> Nicho</label>
            <input className="ct-input" value={f.nicho} onChange={(e) => set("nicho", e.target.value)} placeholder="Games, finanças, beleza..." />
          </div>
          <div className="ct-field">
            <label><Clock size={14} /> Duração</label>
            <select className="ct-select" value={f.duracao} onChange={(e) => set("duracao", +e.target.value)}>
              {[1, 3, 5, 10, 15, 20, 30].map((m) => <option key={m} value={m}>{m} minutos</option>)}
            </select>
          </div>
        </div>
        <div className="ct-field">
          <label><Target size={14} /> Objetivo</label>
          <textarea className="ct-area" value={f.objetivo} onChange={(e) => set("objetivo", e.target.value)} placeholder="O que o espectador deve sentir ou fazer ao final?" />
        </div>
        <div className="ct-field">
          <label><Users size={14} /> Público-alvo</label>
          <input className="ct-input" value={f.publico} onChange={(e) => set("publico", e.target.value)} placeholder="Quem assiste? Idade, interesses, nível..." />
        </div>
        <div className="ct-field">
          <label><Share2 size={14} /> Plataformas</label>
          <div className="ct-pchips">
            {PLATFORMS.map((p) => (
              <div key={p.id} className={`ct-pchip ${f.plataformas.includes(p.id) ? "on" : ""}`} onClick={() => togglePlat(p.id)}>
                <PlatIcon id={p.id} size={16} /> {p.label}
              </div>
            ))}
          </div>
        </div>
        <button className="ct-btn primary" style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
                onClick={start} disabled={!f.titulo || !f.tema || f.plataformas.length === 0}>
          <Sparkles size={16} /> Gerar conteúdo
        </button>
      </div>
    </>
  );
}

/* ----------------------------- Library ----------------------------- */
function Library({ projects, onOpen, onDup, onDel, onNew }) {
  return (
    <>
      <div className="ct-head">
        <div><h1 className="ct-h1">Biblioteca</h1><p className="ct-sub">Todos os seus projetos, salvos e prontos para reuso.</p></div>
        <button className="ct-btn primary" onClick={onNew}><Plus size={16} /> Novo conteúdo</button>
      </div>
      {projects.length === 0 ? (
        <div className="ct-empty">
          <div className="eico"><FolderOpen size={22} /></div>
          Nenhum projeto ainda. Gere seu primeiro conteúdo para começar.
        </div>
      ) : projects.map((p) => (
        <div key={p.id} className="ct-projrow">
          <div className="ct-projmeta" onClick={() => onOpen(p.id)} style={{ cursor: "pointer" }}>
            <b>{p.titulo}</b>
            <small>{p.nicho} · {new Date(p.createdAt).toLocaleDateString("pt-BR")}</small>
            <div className="ct-mini">
              <span className="ct-pill">{p.duracao} min</span>
              {(p.plataformas || []).map((x) => (
                <span key={x} className="ct-pill ct-pill-plat">
                  <PlatIcon id={x} size={11} /> {PLAT[x]?.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            <button className="ct-icobtn" title="Duplicar" onClick={() => onDup(p.id)}><Copy size={15} /></button>
            <button className="ct-icobtn" title="Baixar .md" onClick={() => download(`${p.titulo}.md`, buildMarkdown(p))}><Download size={15} /></button>
            <button className="ct-icobtn" title="Excluir" onClick={() => onDel(p.id)}><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </>
  );
}

/* ----------------------------- Results ----------------------------- */
function Results({ p, copy, ping }) {
  const c = p.content || {};
  const TABS = [
    { id: "roteiro", label: "Roteiro", icon: Play, on: !!c.roteiro },
    { id: "titulos", label: "Títulos", icon: Type, on: !!c.titulos },
    { id: "hashtags", label: "Hashtags", icon: Hash, on: !!c.hashtags },
    { id: "descricoes", label: "Descrições", icon: FileText, on: !!c.descricoes },
  ];
  const first = TABS.find((t) => t.on)?.id || "roteiro";
  const [tab, setTab] = useState(first);

  return (
    <>
      <div className="ct-head">
        <div>
          <h1 className="ct-h1">{p.titulo}</h1>
          <p className="ct-sub">{p.tema} · {p.duracao} min · {(p.plataformas || []).map((x) => PLAT[x]?.label).join(" · ")}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="ct-btn sm" onClick={() => { copy(buildMarkdown(p), "Markdown copiado"); }}><Copy size={14} /> Copiar</button>
          <button className="ct-btn sm" onClick={() => download(`${p.titulo}.md`, buildMarkdown(p))}><Download size={14} /> .md</button>
          <button className="ct-btn sm" onClick={() => download(`${p.titulo}.txt`, buildMarkdown(p))}><Download size={14} /> .txt</button>
        </div>
      </div>

      <div className="ct-tabs">
        {TABS.map((t) => (
          <div key={t.id} className={`ct-tab ${tab === t.id ? "on" : ""}`} style={{ opacity: t.on ? 1 : 0.4 }} onClick={() => t.on && setTab(t.id)}>
            <t.icon size={15} /> {t.label}
          </div>
        ))}
      </div>

      {tab === "roteiro" && c.roteiro && (
        <div style={{ maxWidth: 760 }}>
          <div className="ct-card" style={{ marginBottom: 18, borderColor: "rgba(255,91,110,.3)" }}>
            <div className="ct-tltime" style={{ color: "var(--coral)", marginBottom: 8 }}><Radio size={13} /> GANCHO · primeiros segundos</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontFamily: "var(--disp)", fontWeight: 500 }}>{c.roteiro.gancho}</p>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 24 }}><b style={{ color: "var(--text)" }}>Introdução. </b>{c.roteiro.introducao}</p>
          <p className="ct-sectlbl">Desenvolvimento · minuto a minuto</p>
          <div className="ct-tl">
            {(c.roteiro.blocos || []).map((b, i) => (
              <div key={i} className={`ct-tlitem ${i === 0 ? "hook" : ""}`}>
                <div className="ct-tldot" />
                <div className="ct-tltime">{b.tempo} {i === 0 && <span className="ct-rec">REC</span>}</div>
                <h4 className="ct-tltitle">{b.titulo}</h4>
                <p className="ct-tlbody">{b.fala}</p>
              </div>
            ))}
          </div>
          <div className="ct-card" style={{ marginTop: 8, background: "var(--bg2)" }}>
            <div className="ct-sectlbl" style={{ marginBottom: 8 }}>Chamada para ação (CTA)</div>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6 }}>{c.roteiro.cta}</p>
          </div>
        </div>
      )}

      {tab === "titulos" && c.titulos && (
        <div style={{ maxWidth: 860 }}>
          {[["virais", "Virais", "máximo engajamento"], ["seo", "SEO", "encontráveis na busca"], ["ctr", "Alta CTR", "irresistíveis pro clique"]].map(([k, lbl, sub]) => (
            <div key={k} className="ct-card" style={{ marginBottom: 16 }}>
              <p className="ct-sectlbl" style={{ marginBottom: 4 }}>{lbl} <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--faint)", marginLeft: 6 }}>{sub}</span></p>
              {(c.titulos[k] || []).map((t, i) => (
                <div key={i} className="ct-titrow">
                  <span className="ct-titnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ct-tittxt">{t.t}</span>
                  <div className="ct-metrics">
                    <Metric label="SEO" v={t.seo} /><Metric label="Eng" v={t.eng} /><Metric label="CTR" v={t.ctr} />
                  </div>
                  <button className="ct-icobtn" onClick={() => copy(t.t)}><Copy size={14} /></button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "hashtags" && c.hashtags && (
        <div style={{ maxWidth: 760 }}>
          {[["top", "Top"], ["nicho", "Nicho"], ["virais", "Virais"]].map(([k, lbl]) =>
            c.hashtags[k] ? (
              <div key={k} className="ct-card" style={{ marginBottom: 14 }}>
                <p className="ct-sectlbl">{lbl}</p>
                <div className="ct-tags">
                  {c.hashtags[k].map((h, i) => <span key={i} className="ct-tagchip" onClick={() => copy(h)}>{h}</span>)}
                </div>
              </div>
            ) : null
          )}
          {c.hashtags.plataformas && (
            <div className="ct-card">
              <p className="ct-sectlbl">Por plataforma</p>
              {Object.entries(c.hashtags.plataformas).map(([k, arr]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div className="ct-platname" style={{ marginBottom: 8, fontSize: 13 }}>
                    <PlatIcon id={k} size={15} /> {PLAT[k]?.label || k}
                  </div>
                  <div className="ct-tags">{arr.map((h, i) => <span key={i} className="ct-tagchip" onClick={() => copy(h)}>{h}</span>)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "descricoes" && c.descricoes && (
        <div style={{ maxWidth: 760 }}>
          {Object.entries(c.descricoes).map(([k, v]) =>
            v ? (
              <div key={k} className="ct-platcard">
                <div className="ct-plattop">
                  <div className="ct-platname"><PlatIcon id={k} size={16} /> {PLAT[k]?.label || k}</div>
                  <button className="ct-icobtn" onClick={() => copy(v, `Descrição ${PLAT[k]?.label} copiada`)}><Copy size={14} /></button>
                </div>
                <div className="ct-platbody">{v}</div>
              </div>
            ) : null
          )}
        </div>
      )}
    </>
  );
}

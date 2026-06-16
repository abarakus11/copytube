const USERS_KEY = "copytube-users";
const SESSION_KEY = "copytube-session";

async function hashPassword(password) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function register({ name, email, password }) {
  const users = loadUsers();
  const mail = email.trim().toLowerCase();
  if (!name.trim()) throw new Error("Informe seu nome");
  if (!mail.includes("@")) throw new Error("E-mail inválido");
  if (password.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres");
  if (users.some((u) => u.email === mail)) throw new Error("E-mail já cadastrado");

  const user = {
    id: "u" + Date.now(),
    name: name.trim(),
    email: mail,
    passwordHash: await hashPassword(password),
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);

  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function login({ email, password }) {
  const mail = email.trim().toLowerCase();
  const hash = await hashPassword(password);
  const user = loadUsers().find((u) => u.email === mail && u.passwordHash === hash);
  if (!user) throw new Error("E-mail ou senha incorretos");

  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function projectsKey(userId) {
  return `copytube-projects-${userId}`;
}

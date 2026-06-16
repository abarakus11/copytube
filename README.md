# CopyTube

Central de produção de conteúdo para vídeo com IA — roteiro, títulos, hashtags e descrições por plataforma.

## Stack

- React 19 + Vite 6
- [DogRouter](https://dogrouter.ai) (API OpenAI-compatible)

## Requisitos

- Node.js 18+
- Chave de API no [DogRouter](https://dogrouter.ai/en/api-keys)

## Instalação

```bash
git clone https://github.com/abarakus11/copytube.git
cd copytube
npm install
cp .env.example .env
```

Edite o `.env` com sua chave:

```env
DOGROUTER_API_KEY=sk_live_xxx
OPENAI_API_KEY=sk_live_xxx
OPENAI_BASE_URL=https://api.dogrouter.ai/v1
OPENAI_MODEL=claude-sonnet-4-6
```

> Use `dogrouter/auto` se sua chave tiver acesso a esse modelo no painel.

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

A chave da API fica no servidor (proxy Vite em `/api/ai`) — nunca é exposta no navegador.

## Build

```bash
npm run build
npm run preview
```

## Funcionalidades

- **Dashboard** — visão geral dos projetos
- **Gerar conteúdo** — formulário + IA (roteiro, títulos, hashtags, descrições)
- **Biblioteca** — projetos salvos na sessão
- **Exportar** — copiar, `.md` ou `.txt`

## Segurança

- Não commite o arquivo `.env`
- Não compartilhe chaves de API em issues ou PRs
- Rotacione a chave se ela foi exposta

## Licença

Uso privado — ajuste conforme necessário.

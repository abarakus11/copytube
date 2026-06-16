import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiKey = () =>
    env.DOGROUTER_API_KEY || process.env.DOGROUTER_API_KEY ||
    env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = () =>
    (env.OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || "https://api.dogrouter.ai/v1").replace(/\/$/, "");
  const model = () => env.OPENAI_MODEL || process.env.OPENAI_MODEL || "dogrouter/auto";

  return {
    plugins: [
      react(),
      {
        name: "openai-proxy",
        configureServer(server) {
          server.middlewares.use("/api/health", (_req, res) => {
            const key = apiKey();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              ok: !!key,
              baseUrl: baseUrl(),
              model: model(),
            }));
          });

          server.middlewares.use("/api/ai", (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.end("Method not allowed");
              return;
            }

            const key = apiKey();
            if (!key) {
              res.statusCode = 503;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: { message: "DOGROUTER_API_KEY ou OPENAI_API_KEY não configurada no .env" } }));
              return;
            }

            let body = "";
            req.on("data", (chunk) => { body += chunk; });
            req.on("end", async () => {
              try {
                const payload = JSON.parse(body || "{}");
                payload.model = model();
                if (!payload.max_tokens) payload.max_tokens = 4096;

                const upstream = await fetch(`${baseUrl()}/chat/completions`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                  },
                  body: JSON.stringify(payload),
                });
                const text = await upstream.text();
                res.statusCode = upstream.status;
                res.setHeader("Content-Type", "application/json");
                res.end(text);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: { message: err.message } }));
              }
            });
          });
        },
      },
    ],
  };
});

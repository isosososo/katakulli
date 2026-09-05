// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";


function peopleFilePlugin(): Plugin {
  const file = resolve(process.cwd(), "src/data/people-overrides.json");
  const read = () => {
    try { return JSON.parse(readFileSync(file, "utf8")); } catch { return { cast: [], crew: [] }; }
  };
  return {
    name: "katakulli-people-file-api",
    configureServer(server) {
      server.middlewares.use("/api/upload-photo", async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(Buffer.from(chunk));
          const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as {
            slug?: string;
            dataUrl?: string;
          };
          if (!body.slug || !body.dataUrl?.startsWith("data:image/")) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Geçersiz fotoğraf" }));
            return;
          }

          const match = body.dataUrl.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/);
          if (!match) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Geçersiz fotoğraf verisi" }));
            return;
          }

          const extMap: Record<string, string> = {
            jpeg: "jpg",
            jpg: "jpg",
            png: "png",
            webp: "webp",
            gif: "gif",
            avif: "avif",
          };
          const ext = extMap[match[1].toLowerCase()] ?? "jpg";
          const safeSlug = body.slug.toLowerCase().replace(/[^a-z0-9-çğıöşü]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "photo";
          const uploadDir = resolve(process.cwd(), "public/uploads");
          if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
          const filename = `${safeSlug}.${ext}`;
          const output = resolve(uploadDir, filename);
          writeFileSync(output, Buffer.from(match[2], "base64"));
          res.end(JSON.stringify({ ok: true, path: `/uploads/${filename}` }));
        } catch (error) {
          console.error("Photo upload failed:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Fotoğraf kaydedilemedi." }));
        }
      });

      server.middlewares.use("/api/people", async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (req.method === "GET") {
          const overrides = read();
          if (overrides.cast.length || overrides.crew.length) {
            res.end(JSON.stringify(overrides));
            return;
          }
          const mod = await server.ssrLoadModule("/src/data/people.ts");
          res.end(JSON.stringify({ cast: mod.cast, crew: mod.crew }));
          return;
        }
        if (req.method === "PUT") {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(Buffer.from(chunk));
          const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          if (!Array.isArray(parsed.cast) || !Array.isArray(parsed.crew)) { res.statusCode = 400; res.end(JSON.stringify({ error: "Geçersiz veri" })); return; }
          writeFileSync(file, JSON.stringify(parsed, null, 2) + "\n", "utf8");
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        if (req.method === "DELETE") {
          writeFileSync(file, JSON.stringify({ cast: [], crew: [] }, null, 2) + "\n", "utf8");
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed" }));
      });
    },
  };
}

export default defineConfig({
  vite: {
    base: process.env.GITHUB_ACTIONS ? "/katakulli/" : "/",
    plugins: [peopleFilePlugin()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});

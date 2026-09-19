import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";

export async function setupVite(app: Express, server: Server) {
  if (process.env.NODE_ENV === "production") return;
  try {
    console.log("[Vite] Creating vite server...");
    const { createServer: createViteServer } = await import("vite");
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true as const,
    };
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      server: serverOptions,
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const clientTemplate = path.resolve(process.cwd(), "client/index.html");
        let template = fs.readFileSync(clientTemplate, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } catch (e) {
    console.log("Vite dev server skipped.", e);
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (fs.existsSync(distPath) && fs.existsSync(path.join(distPath, "index.html"))) {
    app.use(express.static(distPath));
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    app.get("/", (_req, res) => {
      res.json({ status: "online", service: "MyPujo Backend API" });
    });
  }
}

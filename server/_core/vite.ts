import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";

export async function setupVite(app: Express, server: Server) {
  if (process.env.NODE_ENV === "production") return;
  try {
    const viteModule = await import("vite");
    const createViteServer = viteModule.createServer;
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true as const,
    };
    const vite = await createViteServer({
      configFile: false,
      server: serverOptions,
      appType: "custom",
    });
    app.use(vite.middlewares);
  } catch {
    console.log("Vite dev server skipped.");
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

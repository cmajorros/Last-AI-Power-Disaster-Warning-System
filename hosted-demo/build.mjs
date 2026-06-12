import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const src = path.join(root, "hosted-demo", "src");
const dist = path.join(root, "dist");
const html = await fs.readFile(path.join(src, "index.html"), "utf8");
const css = await fs.readFile(path.join(src, "styles.css"), "utf8");
const js = await fs.readFile(path.join(src, "app.js"), "utf8");

const page = html
  .replace("<!--STYLE-->", `<style>${css}</style>`)
  .replace("<!--SCRIPT-->", `<script>${js}</script>`);

const worker = `
const html = ${JSON.stringify(page)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, app: "laos-disaster-alert-demo" }), {
        headers: { "content-type": "application/json; charset=utf-8" }
      });
    }
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=120"
      }
    });
  }
};
`;

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, "server"), { recursive: true });
await fs.mkdir(path.join(dist, "client"), { recursive: true });
await fs.mkdir(path.join(dist, ".openai"), { recursive: true });
await fs.writeFile(path.join(dist, "server", "index.js"), worker, "utf8");
await fs.writeFile(path.join(dist, "client", "index.html"), page, "utf8");
await fs.copyFile(path.join(root, ".openai", "hosting.json"), path.join(dist, ".openai", "hosting.json"));
console.log(JSON.stringify({ dist, server: path.join(dist, "server", "index.js") }, null, 2));

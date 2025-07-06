const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const dirs = [
  "rust/src",
  "public",
  "src/components",
  "src/hooks",
  "src/lib",
  "src/pages",
  "src/styles",
  "wasm-build",
];

const files = {
  "package.json": `
{
  "name": "next-wasm-template",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@tensorflow/tfjs": "^4.10.0",
    "next": "15.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
`.trim(),

  "postcss.config.js": `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`.trim(),

  "tailwind.config.js": `
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`.trim(),

  "src/styles/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim(),

  "src/pages/index.tsx": `
import { useEffect } from 'react';
import { initWasm, getKeywords } from '../lib/wasmBridge';

export default function Home() {
  useEffect(() => {
    (async () => {
      await initWasm();
      const result = getKeywords("Welcome to the AI video summarizer template!");
      console.log("Extracted keywords:", result);
    })();
  }, []);

  return (
    <main className="p-10 text-lg font-semibold">
      🧠 AI Frontend + WASM Template (Next.js 15)
    </main>
  );
}
`.trim(),

  "src/lib/wasmBridge.ts": `
import init, { extract_keywords } from '../../wasm-build/pkg';

export const initWasm = async () => {
  await init();
};

export const getKeywords = (text: string): string[] => {
  return extract_keywords(text);
};
`.trim(),

  "rust/Cargo.toml": `
[package]
name = "wasm_core"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
`.trim(),

  "rust/src/lib.rs": `
use wasm_bindgen::prelude::*;
use serde::Serialize;

#[wasm_bindgen]
pub fn extract_keywords(text: &str) -> JsValue {
    let keywords = text.split_whitespace()
                       .filter(|w| w.len() > 4)
                       .map(|w| w.to_lowercase())
                       .collect::<Vec<String>>();
    JsValue::from_serde(&keywords).unwrap()
}
`.trim(),

  ".gitignore": `
node_modules
.next
wasm-build/pkg
dist
.env
`.trim(),

  "README.md": `
# 🧠 Next.js 15 + Rust + WASM + Tailwind Template

This is a boilerplate for frontend engineers building AI/web apps using:

- **Next.js 15**
- **Tailwind CSS**
- **Rust WebAssembly (via wasm-pack)**
- Optional: **TensorFlow.js** or client-side ML

## 📦 Setup

1. Install dependencies:

\`\`\`bash
npm install
\`\`\`

2. Compile Rust to WASM:

\`\`\`bash
cd rust
wasm-pack build --target web --out-dir ../wasm-build
\`\`\`

3. Run the app:

\`\`\`bash
npm run dev
\`\`\`

---

## 🧠 Goal

Use Next.js for UI/UX and WASM for all heavy logic, e.g. keyword extraction, summarization, and AI preprocessing.

---

MIT License
`.trim(),
};

// Create folders
dirs.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`📁 Created: ${dir}`);
});

// Create files
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content + "\n");
  console.log(`📄 Created: ${filePath}`);
}

console.log("\n✅ Project scaffolded!");
console.log("👉 Run the following to get started:");
console.log("   npm install");
console.log(
  "   cd rust && wasm-pack build --target web --out-dir ../wasm-build"
);
console.log("   npm run dev");

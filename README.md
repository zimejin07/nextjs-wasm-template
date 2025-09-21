# Next.js 15 + Rust + WASM + Tailwind Template

This is a boilerplate for frontend engineers building AI/web apps using:

- **Next.js 15**
- **Tailwind CSS**
- **Rust WebAssembly (via wasm-pack)**
- Optional: **TensorFlow.js** or client-side ML

## 📦 Setup

1. Install dependencies:

```bash
npm install
```

2. Compile Rust to WASM:

```bash
cd rust
wasm-pack build --target web --out-dir ../wasm-build
```

3. Run the app:

```bash
npm run dev
```

---

## Goal

Use Next.js for UI/UX and WASM for all heavy logic, e.g. keyword extraction, summarization, and AI preprocessing.

---

MIT License

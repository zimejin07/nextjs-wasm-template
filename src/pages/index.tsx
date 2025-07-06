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

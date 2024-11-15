import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-between gap-10">
        <div className="flex flex-col">
          <label htmlFor="btc">BTC</label>
          <input type="number" id="btc" className="border" />
        </div>
        <button className="border active:bg-blue-300">convert</button>
        <div className="flex flex-col">
          <label htmlFor="btc">IDR</label>
          <div className="border">0</div>
        </div>
      </main>
    </div>
  );
}

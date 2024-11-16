"use client";
import convertBtcToFiat from "@/utils/convertBtcToFiat";
import { useState, useRef } from "react";

export default function Home() {
  const [btcPriceInIdr, setBtcPriceInIdr] = useState<number>(0);
  const btcInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();

    const btcValue = btcInputRef.current?.value;
    const btcAmount = parseFloat(btcValue || "0");

    if (isNaN(btcAmount) || btcAmount <= 0) {
      alert("invalid BTC amount");
      return;
    }

    try {
      const price = await convertBtcToFiat(btcAmount);
      if (price !== undefined)
        setBtcPriceInIdr(price);
      if (price === undefined)
        console.error("price is undefined", price)
    } catch (error) {
      console.error("Error converting BTC to IDR:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form
        className="flex justify-between gap-10"
        onSubmit={handleConvert}
      >
        <div className="flex flex-col">
          <label htmlFor="btc">BTC</label>
          <input
            type="number"
            id="btc"
            className="border p-2"
            ref={btcInputRef}
            placeholder="Enter BTC amount"
          />
        </div>

        <button
          type="submit"
          className="border p-2 active:bg-blue-300"
        >
          Convert
        </button>

        <div className="flex flex-col">
          <label htmlFor="idr">IDR</label>
          <div id="idr" className="border p-2">
            {btcPriceInIdr.toLocaleString("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </form>
    </div>
  );
}

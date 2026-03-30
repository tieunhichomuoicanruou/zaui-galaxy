import React from "react";
import { Page } from "zmp-ui";

export default function Home() {
  return (
    <Page className="bg-black">
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono p-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-2xl tracking-widest border-b border-white/30 pb-2">
            GA.ME
          </h1>
          <p className="text-[10px] mt-2 opacity-30 tracking-[0.3em]">
            GALAXY.MESSANGER.GAME
          </p>
          <p className="text-[10px] mt-2 opacity-30 tracking-[0.3em]">
            ID: 0001
          </p>
        </div>

        {/* Menu */}
        <div className="w-full max-w-xs flex flex-col gap-3">

          <button className="py-3 border border-white/20 opacity-60 hover:opacity-100 hover:border-white transition">
            GALAXY IN
          </button>

          <button className="py-3 border border-white/20 opacity-60 hover:opacity-100 hover:border-white transition">
            THÔNG TIN
          </button>

          <button className="py-3 border border-white/20 opacity-60 hover:opacity-100 hover:border-white transition">
            MÃ NGUỒN MỞ
          </button>

        </div>

      </div>
    </Page>
  );
}
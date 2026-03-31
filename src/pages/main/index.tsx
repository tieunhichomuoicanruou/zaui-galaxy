import React, { useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import { PATHS } from "@/constants/path";
import { TypingAsciiArt } from "@/components/banner";
import { LoadingPage } from "@/components/loading";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGalaxyInClick = () => {
    setIsLoading(true);
  };

  return (
    <Page className="bg-black overflow-hidden">
      {isLoading ? (
        <LoadingPage
          isReady={true}
          onLaunch={() => navigate(PATHS.GALAXY)}
        />
      ) : (
        <div
          id="home-content"
          className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-mono p-6 animate-fade-in"
        >
          {/* Title */}
          <div className="mb-12">
            <TypingAsciiArt />
            <p className="text-[10px] mt-4 opacity-30 tracking-[0.4em] text-center">
              GALAXY.MESSANGER.GAME
            </p>
          </div>

          <div className="w-full max-w-xs flex flex-col gap-3">
            <button
              onClick={handleGalaxyInClick}
              className="py-3 border border-white/20 opacity-60 hover:opacity-100 hover:border-white transition"
            >
              GALAXY IN
            </button>

            <button className="py-3 border border-white/20 opacity-60 hover:opacity-100 hover:border-white transition">
              MÃ NGUỒN MỞ
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
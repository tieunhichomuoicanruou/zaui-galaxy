import React, { useState, useEffect } from "react";

export const LoadingPage = ({ isReady, onLaunch }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 95) return prev + 1;
                if (isReady) {
                    clearInterval(interval);
                    return 100;
                }
                return prev;
            });
        }, 20);
        return () => clearInterval(interval);
    }, [isReady]);

    useEffect(() => {
        if (progress === 100) onLaunch();
    }, [progress]);

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
            <div className="w-40 h-8 border border-white/20 relative bg-white/5">
                <div
                    className="h-full bg-white transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white">
                    {progress}%
                </span>
            </div>
        </div>
    );
};
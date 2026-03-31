import React, { useState, useEffect } from "react";

export const TypingAsciiArt: React.FC = () => {
    const fullAsciiArt = [
        " _______  _______        __   __  _______ ",
        "|       ||   _   |      |  |_|  ||       |",
        "|    ___||  |_|  |      |       ||    ___|",
        "|   | __ |       |      |       ||   |___ ",
        "|   ||  ||       | ___  |       ||    ___|",
        "|   |_| ||   _   ||   | | ||_|| ||   |___ ",
        "|_______||__| |__||___| |_|   |_||_______|",
    ];

    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < fullAsciiArt.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, fullAsciiArt[currentLine]]);
                setCurrentLine((prev) => prev + 1);
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="font-mono text-white text-xs sm:text-sm md:text-base p-4 bg-black">
            <pre className="whitespace-pre">
                {displayedLines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </pre>
        </div>
    );
};
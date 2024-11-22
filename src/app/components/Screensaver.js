"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { useScreensaverContext } from "../ScreensaverContext";

// List of quotes
const quotes = [
  {
    text: "Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience.",
    author: "Dr. B.R. Ambedkar",
  },
  {
    text: "A democracy is not a static thing. It is a living force. It requires constant nurturing and action to ensure it does not wither away.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The forces of history and of our own growth combine to make us go forward. The future is ours to make.",
    author: "Jawaharlal Nehru",
  },
  {
    text: "The Constitution is the foundation of the country, and it ensures justice, liberty, equality, and fraternity.",
    author: "Dr. Rajendra Prasad",
  },
  {
    text: "What we really are matters more than what we say.",
    author: "Sardar Vallabhbhai Patel",
  },
  {
    text: "The spirit of democracy cannot be imposed from without. It has to come from within.",
    author: "M. K. Gandhi",
  },
  {
    text: "The Constitution is not a mere document; it is the foundation of the rule of law, which protects the rights of the individual.",
    author: "Nani Palkhivala",
  },
  {
    text: "The Constitution is a living document, meant to grow and develop with the changing needs of society.",
    author: "Justice V.R. Krishna Iyer",
  },
  {
    text: "Democracy is about the spirit of equality, of human dignity and the right to pursue one's own destiny.",
    author: "Vikram Sarabhai",
  },
  {
    text: "Democracy is not just a set of institutions; it is a way of life.",
    author: "Amartya Sen",
  },
];

const Screensaver = ({ idleTimeout = 100000, quoteInterval = 5000 }) => {
  const { screensaverDisabled, setScreensaverDisabled } =
    useScreensaverContext();
  const [isIdle, setIsIdle] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Idle detection logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [idleTimeout]);

  // Quote rotation logic
  useEffect(() => {
    if (isIdle) {
      const quoteTimer = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, quoteInterval);

      return () => clearInterval(quoteTimer); // Cleanup on component unmount or when idle ends
    }
  }, [isIdle, quoteInterval]);

  if (screensaverDisabled) return null;

  return (
    <>
      {isIdle && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Video background */}
          <video
            className="w-full h-full object-cover"
            src={"./screensaver.mp4"}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay over the video */}
          <div className="absolute inset-0 bg-black bg-opacity-95 z-40"></div>

          {/* Content layout */}
          <div className="w-full h-full absolute inset-0 flex">
            {/* Left Half - Logo */}
            <div className="w-1/2 flex items-center justify-center z-50">
              <img src="./logo.png" alt="Logo" className=" h-auto w-[30vw]" />
            </div>

            {/* Right Half - Text */}
            <div className="w-1/2 h-full flex items-center justify-center text-center z-50 px-4">
              <h1 className="text-6xl font-bold text-white">
                It happens only in{" "}
                <span className="text-yellow-500">INDIA</span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Screensaver;

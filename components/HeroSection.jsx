"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Image from "next/image";

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState(null);

  // Video configuration - update VIDEO_ID when a new video is available
  const ENABLE_VIDEO = false; // Set to true when ready
  const VIDEO_ID = "T8r_MJ26pMc"; // Update with new video ID when available

  // YouTube player options
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      mute: 0,
      loop: 1,
      playlist: VIDEO_ID, // Required for looping
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    // Start playing with sound
    event.target.playVideo();
    setIsPlaying(true);
    setIsMuted(false);
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  const onEnd = (event) => {
    // Restart video when it ends (loop)
    event.target.playVideo();
  };

  const onError = (error) => {
    console.error("YouTube player error:", error);
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
        // Unmute when user initiates play
        if (isMuted) {
          player.unMute();
          setIsMuted(false);
        }
      }
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  // Clean up player on unmount
  useEffect(() => {
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [player]);

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-colorSecond-light dark:text-colorSecond-dark overflow-hidden h-96">
      {/* Desktop: Content overlay on video, centered vertically and horizontally */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className="!text-white">Evde Uyku Testi</h1>
          <p className="!text-white mb-6 max-w-2xl">
            Horlama ve uyku apnesi riskinizi evde kolayca ölçün.
          </p>
          <div className="flex flex-row justify-center gap-4">
            <Link
              href="/uyku-apnesi-testi"
              className="button flex items-center justify-center"
            >
              Uyku Testi Yap
            </Link>
            <Link
              href="/iletisim"
              className="button flex items-center justify-center !bg-transparent hover:!bg-white hover:!text-black"
            >
              İletişime Geç
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Video container with responsive aspect ratio or static background */}
      {ENABLE_VIDEO ? (
        <div className="relative w-full aspect-video">
          {console.log("Rendering YouTube component with video ID:", VIDEO_ID)}
          <YouTube
            videoId={VIDEO_ID}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
            onEnd={onEnd}
            onError={onError}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ) : (
        //<div className="relative w-full h-96 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <Image src="/img/uyku-2.webp" alt="evde uyku testi" width={1500} height={500} loading="lazy"/>
      )}

      {/* Overlay to reduce video visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Control buttons - centered at top (only shown when video is enabled) */}
      {ENABLE_VIDEO && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
          <button
            onClick={togglePlay}
            className="bg-black/30 backdrop-blur-sm rounded-full p-3 hover:bg-black/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label={isPlaying ? "Durdur" : "Oynat"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-6 h-6"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-6 h-6"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="bg-black/30 backdrop-blur-sm rounded-full p-3 hover:bg-black/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-6 h-6"
              >
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V4.702Z"></path>
                <path d="M16 9a5 5 0 0 1 0 6"></path>
                <path d="m19 12 3 3m0-6-3 3"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-6 h-6"
              >
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V4.702Z"></path>
                <path d="M16 9a5 5 0 0 1 0 6"></path>
                <path d="M19 6a9 9 0 0 1 0 12"></path>
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Mobile: Content below video */}
      <div className="md:hidden w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 py-8 w-full max-w-4xl"
        >
          <h1 className="!text-white">Evde Uyku Testi</h1>
          <p className="!text-white mb-6">
            Horlama ve uyku apnesi riskinizi evde kolayca ölçün.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/uyku-apnesi-testi"
              className="button flex items-center justify-center"
            >
              Uyku Testi Yap
            </Link>
            <Link
              href="/iletisim"
              className="button flex items-center justify-center !bg-transparent hover:!bg-white hover:!text-black"
            >
              İletişime Geç
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Auto-hide controls after 3 seconds of no activity
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show controls when user interacts with them
  const handleControlInteraction = () => {
    setShowControls(true);
    // Clear any existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Set new timeout to hide controls
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Initialize YouTube player API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
          initializePlayer();
        };
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      // Check if YT.Player is available
      if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
        if (iframeRef.current) {
          playerRef.current = new YT.Player(iframeRef.current, {
            events: {
              onReady: (event) => {
                // Try to play after a short delay
                setTimeout(() => {
                  attemptAutoplay(event.target);
                }, 500);
              },
              onStateChange: (event) => {
                // Handle video state changes
                if (event.data === YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === YT.PlayerState.ENDED) {
                  // Restart video when it ends (loop)
                  if (typeof event.target.playVideo === "function") {
                    event.target.playVideo();
                  }
                }
              },
            },
          });
        }
      } else {
        console.warn("YouTube API not loaded yet, retrying in 1 second");
        setTimeout(initializePlayer, 1000);
      }
    };

    const attemptAutoplay = (player) => {
      try {
        // First try to play with sound
        if (
          typeof player.playVideo === "function" &&
          typeof player.unMute === "function"
        ) {
          player.playVideo();
          player.unMute();
          setIsPlaying(true);
          setIsMuted(false);
        }
      } catch (error) {
        // If that fails, try to play muted
        try {
          if (
            typeof player.mute === "function" &&
            typeof player.playVideo === "function"
          ) {
            player.mute();
            player.playVideo();
            setIsPlaying(true);
            setIsMuted(true);
          }
        } catch (muteError) {
          // If both fail, we'll need user interaction
          console.log("Autoplay blocked, waiting for user interaction");
        }
      }
    };

    loadYouTubeAPI();

    // Cleanup
    return () => {
      // Check if player exists and has destroy method before calling it
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted && playerRef.current) {
        setUserInteracted(true);
        try {
          // Check if the player methods exist before calling them
          if (
            typeof playerRef.current.playVideo === "function" &&
            typeof playerRef.current.unMute === "function"
          ) {
            playerRef.current.playVideo();
            playerRef.current.unMute();
            setIsPlaying(true);
            setIsMuted(false);
          }
        } catch (error) {
          console.log("Failed to start video on user interaction");
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [userInteracted]);

  const toggleMute = () => {
    if (playerRef.current) {
      // Check if the player methods exist before calling them
      if (
        typeof playerRef.current.unMute === "function" &&
        typeof playerRef.current.mute === "function"
      ) {
        if (isMuted) {
          playerRef.current.unMute();
        } else {
          playerRef.current.mute();
        }
        setIsMuted(!isMuted);
      } else {
        console.warn("YouTube player methods not available yet");
      }
    }
    handleControlInteraction();
  };

  const togglePlay = () => {
    if (playerRef.current) {
      // Check if the player methods exist before calling them
      if (
        typeof playerRef.current.pauseVideo === "function" &&
        typeof playerRef.current.playVideo === "function"
      ) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
          // Ensure we unmute on user-initiated play
          if (isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
          }
        }
        setIsPlaying(!isPlaying);
      } else {
        console.warn("YouTube player methods not available yet");
      }
    }
    handleControlInteraction();
  };

  // Add a manual play button for cases where autoplay fails
  const handleManualPlay = () => {
    if (playerRef.current) {
      // Check if the player methods exist before calling them
      if (
        typeof playerRef.current.playVideo === "function" &&
        typeof playerRef.current.unMute === "function"
      ) {
        playerRef.current.playVideo();
        playerRef.current.unMute();
        setIsPlaying(true);
        setIsMuted(false);
        setUserInteracted(true);
      } else {
        console.warn("YouTube player methods not available yet");
      }
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-colorSecond-light dark:text-colorSecond-dark overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/T8r_MJ26pMc?si=fNqoCGgOFALlVyi2&controls=0&autoplay=1&loop=1&playlist=T8r_MJ26pMc&modestbranding=1&showinfo=0&enablejsapi=1&rel=0&iv_load_policy=3&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      </div>

      {/* Overlay to reduce video visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Control buttons - centered at top */}
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => setShowControls(true)}
      >
        <button
          onClick={togglePlay}
          className="bg-black/30 backdrop-blur-sm rounded-full p-3 hover:bg-black/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? "Durdur" : "Oynat"}
        >
          {isPlaying ? (
            <Pause className="text-white w-6 h-6" />
          ) : (
            <Play className="text-white w-6 h-6" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="bg-black/30 backdrop-blur-sm rounded-full p-3 hover:bg-black/50 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
        >
          {isMuted ? (
            <VolumeX className="text-white w-6 h-6" />
          ) : (
            <Volume2 className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      {/* Show controls on hover anywhere in the hero section except the controls themselves */}
      <div
        className="absolute inset-0 z-5"
        onMouseMove={handleControlInteraction}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 pt-16 md:pt-0"
      >
        <h1 className="!text-white">
          Evde Uyku Testi
        </h1>
        <p className="!text-white">
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
    </section>
  );
}

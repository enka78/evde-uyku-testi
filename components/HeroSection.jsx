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
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
        
        window.onYouTubeIframeAPIReady = () => {
          initializePlayer();
        };
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      if (iframeRef.current) {
        playerRef.current = new YT.Player(iframeRef.current, {
          events: {
            'onReady': (event) => {
              // Try to play after a short delay
              setTimeout(() => {
                attemptAutoplay(event.target);
              }, 500);
            },
            'onStateChange': (event) => {
              // Handle video state changes
              if (event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === YT.PlayerState.ENDED) {
                // Restart video when it ends (loop)
                event.target.playVideo();
              }
            }
          }
        });
      }
    };

    const attemptAutoplay = (player) => {
      try {
        // First try to play with sound
        player.playVideo();
        player.unMute();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        // If that fails, try to play muted
        try {
          player.mute();
          player.playVideo();
          setIsPlaying(true);
          setIsMuted(true);
        } catch (muteError) {
          // If both fail, we'll need user interaction
          console.log("Autoplay blocked, waiting for user interaction");
        }
      }
    };

    loadYouTubeAPI();

    // Cleanup
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
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
          playerRef.current.playVideo();
          playerRef.current.unMute();
          setIsPlaying(true);
          setIsMuted(false);
        } catch (error) {
          console.log("Failed to start video on user interaction");
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userInteracted]);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
    handleControlInteraction();
  };

  const togglePlay = () => {
    if (playerRef.current) {
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
    }
    handleControlInteraction();
  };

  // Add a manual play button for cases where autoplay fails
  const handleManualPlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      playerRef.current.unMute();
      setIsPlaying(true);
      setIsMuted(false);
      setUserInteracted(true);
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-foreground overflow-hidden">
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
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Control buttons - centered at top */}
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
           onMouseEnter={() => setShowControls(true)}>
        <button 
          onClick={togglePlay}
          className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? "Durdur" : "Oynat"}
        >
          {isPlaying ? <Pause className="text-white w-6 h-6" /> : <Play className="text-white w-6 h-6" />}
        </button>
        
        <button 
          onClick={toggleMute}
          className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
        >
          {isMuted ? <VolumeX className="text-white w-6 h-6" /> : <Volume2 className="text-white w-6 h-6" />}
        </button>
      </div>

      {/* Show controls on hover anywhere in the hero section except the controls themselves */}
      <div className="absolute inset-0 z-5" 
           onMouseMove={handleControlInteraction}>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 pt-16 md:pt-0"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Evde Uyku Testi
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
          Horlama ve uyku apnesi riskinizi evde kolayca ölçün.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/uyku-apnesi-testi" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg dark:bg-gray-800 dark:text-white">
            Uyku Testi Yap
          </Link>
          <Link href="/iletisim" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition shadow-lg dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
            İletişime Geç
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
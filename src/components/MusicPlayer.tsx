import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import audioFile from "@/assets/seedhemaut.mp3";
import brandNewLogo from "@/assets/brand-new-logo.png";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();
  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const setupAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      visualize();
    }
  };

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, "hsl(var(--neon-cyan))");
        gradient.addColorStop(1, "hsl(var(--neon-pink))");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setupAudioContext();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-neon-cyan/30 shadow-[0_-4px_30px_rgba(0,255,255,0.2)] z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* CD Artwork */}
          <motion.div
            className="relative w-16 h-16 flex-shrink-0"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-cyan via-primary to-neon-pink shadow-[0_0_20px_rgba(0,255,255,0.5)]">
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan" />
              </div>
            </div>
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full bg-neon-cyan/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-neon-cyan/20 hover:bg-neon-cyan/30 border border-neon-cyan/50"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-neon-cyan" />
              ) : (
                <Play className="w-5 h-5 text-neon-cyan" />
              )}
            </Button>
          </div>

          {/* Visualizer */}
          <div className="flex-1 h-16 flex items-center">
            <canvas
              ref={canvasRef}
              width={800}
              height={64}
              className="w-full h-full"
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 flex-shrink-0 w-32">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="w-8 h-8"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-foreground" />
              )}
            </Button>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Song Title */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <img 
            src={brandNewLogo} 
            alt="Brand New" 
            className="w-8 h-8 object-contain"
          />
          <p className="text-sm text-neon-cyan font-semibold">Brand New!</p>
        </div>
      </div>

      <audio ref={audioRef} src={audioFile} loop />
    </motion.div>
  );
};

export default MusicPlayer;

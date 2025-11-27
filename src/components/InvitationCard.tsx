import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Calendar, DollarSign, Sparkles } from "lucide-react";
import MusicPlayer from "./MusicPlayer";

const InvitationCard = () => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const glowAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-neon-pink/20 rounded-full blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-neon-pink/30 shadow-[0_0_50px_rgba(255,64,232,0.3)]">
          {/* Sparkle decorations */}
          <motion.div
            className="absolute -top-4 -left-4"
            animate={glowAnimation}
          >
            <Sparkles className="w-8 h-8 text-neon-yellow" />
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              ...glowAnimation,
              transition: { ...glowAnimation.transition, delay: 0.5 },
            }}
          >
            <Sparkles className="w-8 h-8 text-neon-cyan" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              FAREWELL
            </h1>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neon-pink"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,64,232,0.5)",
                  "0 0 20px rgba(255,64,232,0.8)",
                  "0 0 10px rgba(255,64,232,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AFTER PARTY
            </motion.h2>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6 mb-8"
          >
            <div className="flex items-center gap-4 text-foreground p-4 rounded-xl bg-muted/50 border border-neon-cyan/30 hover:border-neon-cyan transition-all duration-300">
              <MapPin className="w-6 h-6 text-neon-cyan" />
              <span className="text-lg font-semibold">Havana by Ramada</span>
            </div>

            <div className="flex items-center gap-4 text-foreground p-4 rounded-xl bg-muted/50 border border-neon-purple/30 hover:border-neon-purple transition-all duration-300">
              <Calendar className="w-6 h-6 text-neon-purple" />
              <span className="text-lg font-semibold">Farewell Day</span>
            </div>

            <div className="flex items-center gap-4 text-foreground p-4 rounded-xl bg-muted/50 border border-neon-yellow/30 hover:border-neon-yellow transition-all duration-300">
              <DollarSign className="w-6 h-6 text-neon-yellow" />
              <span className="text-lg font-semibold">₹2,500 per person</span>
            </div>
          </motion.div>

          {/* Organizers */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 p-6 rounded-xl bg-gradient-to-br from-muted/50 to-card/50 border border-neon-pink/30"
          >
            <h3 className="text-xl font-bold text-neon-pink mb-4">Organized By</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-foreground">
                <p className="font-bold text-lg">Rohit Singh</p>
                <a
                  href="tel:+917819037576"
                  className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 78190 37576
                </a>
              </div>
              <div className="text-foreground">
                <p className="font-bold text-lg">Jitin Gangwar</p>
                <a
                  href="tel:+917505693658"
                  className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 75056 93658
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <a href="https://wa.me/917819037576?text=Count%20me%20in!" target="_blank" rel="noopener noreferrer">
              <Button
                variant="neon"
                size="lg"
                className="text-lg px-12 py-6 rounded-full font-bold uppercase tracking-wider"
              >
                Reserve Your Spot
              </Button>
            </a>
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-8 text-muted-foreground italic"
          >
            Let's make memories that last forever! ✨
          </motion.p>
        </div>
      </motion.div>

      <MusicPlayer />
    </div>
  );
};

export default InvitationCard;

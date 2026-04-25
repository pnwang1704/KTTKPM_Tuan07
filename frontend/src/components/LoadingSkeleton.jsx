import { motion } from 'framer-motion';

export function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden glass-panel">
      <div className="aspect-[2/3] w-full bg-white/5 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-white/10 rounded w-3/4 animate-pulse" />
        <div className="flex gap-4">
          <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function CinematicLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
      <div className="relative w-24 h-24">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-accent-gold/80 shadow-[0_0_15px_#d4af37]"
        />
        {/* Inner reverse ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-accent-blue/80 shadow-[0_0_15px_#00d2ff]"
        />
        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-10 rounded-full bg-accent-red shadow-[0_0_10px_#e50914]"
        />
      </div>
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-xl font-light tracking-[0.2em] text-accent-gold glow-text"
      >
        PROCESSING
      </motion.p>
    </div>
  );
}

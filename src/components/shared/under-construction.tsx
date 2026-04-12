"use client";

import Link from "next/link";
import { Construction, ArrowLeft, Home, Zap, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export function UnderConstruction({
  title = "Module Under Development",
  message = "Our engineers are currently crafting this experience. Something transformative is coming your way soon."
}: UnderConstructionProps) {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-2xl bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse delay-700" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Animated Icon Container */}
        <div className="mb-10 relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 sm:w-32 sm:sm:h-32 bg-linear-to-br from-primary to-violet-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/30 relative z-10"
          >
            <Construction className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </motion.div>
          
          {/* Orbital Icons */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-background border border-primary/20 rounded-xl shadow-lg">
                <Hammer className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute bottom-0 right-4 p-2 bg-background border border-primary/20 rounded-xl shadow-lg">
                <Wrench className="w-5 h-5 text-violet-500" />
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-background border border-primary/20 rounded-xl shadow-lg">
                <Zap className="w-5 h-5 text-amber-500" />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                {title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "text-primary italic" : ""}>{word} </span>
                ))}
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-muted-foreground font-medium italic max-w-lg mx-auto leading-relaxed"
          >
            {message}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
                className="h-14 px-8 rounded-full border-2 font-bold hover:bg-primary/5 hover:border-primary/50 transition-all gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Return Back
            </Button>
            <Button 
                asChild
                size="lg"
                className="h-14 px-10 rounded-full shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 font-black italic gap-3"
            >
              <Link href="/">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Status Badge */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-primary/5"
        >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Feature Pipeline Active</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

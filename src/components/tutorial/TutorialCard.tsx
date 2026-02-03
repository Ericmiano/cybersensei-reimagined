import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TutorialStep } from "@/contexts/TutorialContext";

interface TutorialCardProps {
  step: TutorialStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onEnd: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function TutorialCard({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onEnd,
  isFirstStep,
  isLastStep,
}: TutorialCardProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card
      className={cn(
        "w-[calc(100vw-2rem)] max-w-sm overflow-hidden",
        "bg-card/95 backdrop-blur-xl border-primary/30",
        "shadow-2xl shadow-primary/20"
      )}
    >
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 -mr-2 -mt-2 text-muted-foreground hover:text-foreground"
            onClick={onSkip}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4 sm:mb-6">
          <h3 className="font-cyber text-lg sm:text-xl text-primary mb-2 leading-tight">
            {step.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1 mb-4 sm:mb-6 flex-wrap">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentStep
                  ? "w-5 sm:w-6 bg-primary"
                  : index < currentStep
                  ? "w-1.5 bg-primary/50"
                  : "w-1.5 bg-muted-foreground/30"
              )}
              animate={{
                scale: index === currentStep ? 1 : 0.8,
              }}
            />
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <p className="text-xs text-muted-foreground/60 text-center mb-3 sm:hidden">
          ← Swipe to navigate →
        </p>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={isFirstStep}
            size="sm"
            className="gap-1 px-2 sm:px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onSkip}
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1 px-2 sm:px-3"
          >
            <SkipForward className="h-4 w-4" />
            <span className="hidden sm:inline">Skip</span>
          </Button>

          <Button
            onClick={isLastStep ? onEnd : onNext}
            size="sm"
            className="gap-1 px-3 sm:px-4 neon-glow-cyan"
          >
            {isLastStep ? (
              step.action || "Finish"
            ) : (
              <>
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

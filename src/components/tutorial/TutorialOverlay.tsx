import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useTutorial } from "@/contexts/TutorialContext";

export default function TutorialOverlay() {
  const {
    isActive,
    currentStep,
    steps,
    currentStepData,
    nextStep,
    prevStep,
    skipTutorial,
    endTutorial,
  } = useTutorial();

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Find and highlight target element
  useEffect(() => {
    if (!isActive || !currentStepData?.targetSelector) {
      setTargetRect(null);
      return;
    }

    const findTarget = () => {
      const target = document.querySelector(currentStepData.targetSelector!);
      if (target) {
        setTargetRect(target.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    findTarget();
    window.addEventListener("resize", findTarget);
    window.addEventListener("scroll", findTarget);

    return () => {
      window.removeEventListener("resize", findTarget);
      window.removeEventListener("scroll", findTarget);
    };
  }, [isActive, currentStepData]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive) return;
      if (e.key === "Escape") skipTutorial();
      if (e.key === "ArrowRight" || e.key === "Enter") nextStep();
      if (e.key === "ArrowLeft") prevStep();
    },
    [isActive, nextStep, prevStep, skipTutorial]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isActive || !currentStepData) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const isCentered = currentStepData.placement === "center" || !targetRect;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (isCentered || !targetRect) {
      return {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const padding = 16;
    const placement = currentStepData.placement || "bottom";

    switch (placement) {
      case "right":
        return {
          position: "fixed" as const,
          top: Math.max(padding, targetRect.top),
          left: targetRect.right + padding,
        };
      case "left":
        return {
          position: "fixed" as const,
          top: Math.max(padding, targetRect.top),
          right: window.innerWidth - targetRect.left + padding,
        };
      case "top":
        return {
          position: "fixed" as const,
          bottom: window.innerHeight - targetRect.top + padding,
          left: targetRect.left,
        };
      case "bottom":
      default:
        return {
          position: "fixed" as const,
          top: targetRect.bottom + padding,
          left: targetRect.left,
        };
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
          onClick={skipTutorial}
        />

        {/* Highlight cutout for target element */}
        {targetRect && currentStepData.highlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
              borderRadius: "12px",
              border: "2px solid hsl(var(--primary))",
            }}
          >
            <div className="absolute inset-0 rounded-xl animate-pulse-glow" />
          </motion.div>
        )}

        {/* Tutorial tooltip card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="pointer-events-auto"
          style={getTooltipPosition()}
        >
          <Card
            className={cn(
              "w-[90vw] max-w-md overflow-hidden",
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

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground font-mono">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 -mt-2 text-muted-foreground hover:text-foreground"
                  onClick={skipTutorial}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="font-cyber text-xl text-primary mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Step indicators */}
              <div className="flex justify-center gap-1.5 mb-6">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === currentStep
                        ? "w-6 bg-primary"
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

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={isFirstStep}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>

                <Button
                  variant="ghost"
                  onClick={skipTutorial}
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <SkipForward className="h-4 w-4" />
                  Skip Tour
                </Button>

                <Button
                  onClick={isLastStep ? endTutorial : nextStep}
                  className="gap-2 neon-glow-cyan"
                >
                  {isLastStep ? (
                    currentStepData.action || "Finish"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

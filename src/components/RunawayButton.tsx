import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import confusedGif from "@/assets/bobawooyo-dog-confused.gif";

const excuses = [
  "Oops! 🙈",
  "Nice try! 😜",
  "Not so fast! 💨",
  "Can't catch me! 🏃‍♀️",
  "Think again! 💭",
  "Nope! 🙅‍♀️",
  "Wrong choice! ❌",
  "Try the other one! 💕",
];

const RunawayButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isWiggling, setIsWiggling] = useState(false);
  const [currentExcuse, setCurrentExcuse] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [showGifOverlay, setShowGifOverlay] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);
  const isMobile = useIsMobile();

  const runAway = useCallback(() => {
    if (!containerRef.current || !buttonRef.current) return;

    // Throttle movements to avoid too rapid changes
    const now = Date.now();
    if (now - lastMoveTime.current < 50) return;
    lastMoveTime.current = now;

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Calculate new random position within bounds
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;

    let newX = Math.random() * maxX - maxX / 2;
    let newY = Math.random() * maxY - maxY / 2;

    // Make sure it's at least 100px away from current position
    const distance = Math.sqrt(
      Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2),
    );
    if (distance < 100) {
      newX = newX > 0 ? newX + 100 : newX - 100;
      newY = newY > 0 ? newY + 100 : newY - 100;
    }

    // Keep within bounds
    newX = Math.max(-maxX / 2, Math.min(maxX / 2, newX));
    newY = Math.max(-maxY / 2, Math.min(maxY / 2, newY));

    setPosition({ x: newX, y: newY });
    setIsWiggling(true);
    setCurrentExcuse(excuses[Math.floor(Math.random() * excuses.length)]);

    setTimeout(() => setIsWiggling(false), 500);
  }, [position.x, position.y]);

  const handleNoClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5 && !showGifOverlay) {
      setShowGifOverlay(true);
    }

    runAway();
  }, [clickCount, showGifOverlay, runAway]);

  // Track mouse movement globally in the document (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const button = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance from mouse to button center
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) +
          Math.pow(mouseY - buttonCenterY, 2),
      );

      // If mouse is within 150px of button, run away!
      const triggerDistance = 150;
      if (distance < triggerDistance) {
        runAway();
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    return () =>
      document.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [runAway, isMobile]);

  useEffect(() => {
    // Clear excuse after 2 seconds
    if (currentExcuse) {
      const timer = setTimeout(() => setCurrentExcuse(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentExcuse]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 flex items-center justify-center"
    >
      {/* GIF Overlay after 5 clicks */}
      {showGifOverlay && (
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          <img
            src={confusedGif}
            alt="Sad puppy eyes"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}

      {/* Excuse popup */}

      <Button
        ref={buttonRef}
        variant="outline"
        size="lg"
        className={`
          relative z-10 transition-all duration-200 ease-out
          border-2 border-muted-foreground/30 hover:border-muted-foreground/50
          bg-card hover:bg-muted text-muted-foreground
          font-elegant text-lg px-8 py-6
          ${isWiggling ? "animate-wiggle" : ""}
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          handleNoClick();
        }}
        onClick={(e) => {
          e.preventDefault();
          if (!isMobile) {
            handleNoClick();
          }
        }}
      >
        No 😢
      </Button>
    </div>
  );
};

export default RunawayButton;

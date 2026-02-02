import { useState } from "react";
import { Button } from "@/components/ui/button";
import RunawayButton from "./RunawayButton";
import CelebrationEffect from "./CelebrationEffect";
import happyGif from "@/assets/happy-celebration.gif";

const ProposalCard = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);

  const handleYesClick = () => {
    setYesClicked(true);
    setShowCelebration(true);

    // Hide celebration hearts after 3 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  if (yesClicked) {
    return (
      <div className="relative z-10 w-full max-w-2xl mx-auto p-8">
        {showCelebration && <CelebrationEffect />}

        <div className="bg-card-gradient backdrop-blur-sm rounded-3xl p-8 shadow-card border border-rose-light/30 text-center animate-bounce-in">
          <div className="text-6xl mb-6">💍</div>
          <h1 className="font-romantic text-5xl text-primary mb-4">
            She Said Yes!
          </h1>
          <p className="font-elegant text-xl text-foreground/80 mb-4">
            I knew you would! 💕
          </p>
          <p className="font-romantic text-3xl text-rose-dark mb-6">
            I love you always and forever ❤️
          </p>

          {/* Happy doggo */}
          <div className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden mb-6">
            <img
              src={happyGif}
              alt="Happy excited dog"
              className="w-full h-auto"
            />
          </div>

          <div className="flex justify-center gap-4 text-4xl">
            <span className="animate-pulse">💖</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
              💕
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
              💗
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-8">
      <div className="bg-card-gradient backdrop-blur-sm rounded-3xl p-10 shadow-card border border-rose-light/30">
        {/* Ring emoji */}
        <div className="text-center mb-6">
          <span className="text-6xl animate-float inline-block">💍</span>
        </div>

        {/* Question */}
        <h1 className="font-romantic text-5xl md:text-6xl text-center text-primary mb-2">
          Will You
        </h1>
        <h2 className="font-romantic text-5xl md:text-6xl text-center text-rose-dark mb-8">
          Marry Me?
        </h2>

        {/* Hearts decoration */}
        <div className="flex justify-center gap-3 mb-8">
          <span className="text-2xl animate-pulse">💕</span>
          <span
            className="text-3xl animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            💖
          </span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            💕
          </span>
        </div>

        {/* Yes Button */}
        <div className="flex justify-center mb-6">
          <Button
            size="lg"
            onClick={handleYesClick}
            className="
              bg-gold-gradient hover:brightness-110
              text-primary-foreground font-elegant text-xl
              px-12 py-7 rounded-full
              shadow-romantic hover:shadow-glow
              transition-all duration-300
              animate-pulse-glow
            "
          >
            Yes! 💖
          </Button>
        </div>

        {/* Runaway No Button */}
        <RunawayButton />
      </div>
    </div>
  );
};

export default ProposalCard;

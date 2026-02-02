import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
  rotation: number;
}

const emojis = ["💖", "💕", "💗", "💝", "💘", "✨", "🎉", "💍", "🌹", "❤️"];

const CelebrationEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bigHeart, setBigHeart] = useState(false);

  useEffect(() => {
    // Create celebration particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
      });
    }
    setParticles(newParticles);

    // Show big heart
    setTimeout(() => setBigHeart(true), 500);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-confetti"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Center big heart */}
      {bigHeart && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-celebration text-9xl">
            💖
          </div>
        </div>
      )}

      {/* Sparkles around */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: `${10 + (i % 4) * 25 + Math.random() * 10}%`,
            top: `${10 + Math.floor(i / 4) * 35 + Math.random() * 10}%`,
            animationDelay: `${i * 0.2}s`,
            fontSize: "24px",
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

export default CelebrationEffect;

import FloatingHearts from "@/components/FloatingHearts";
import ProposalCard from "@/components/ProposalCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-romantic-gradient flex items-center justify-center overflow-hidden relative">
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Subtle sparkle overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle text-xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main content */}
      <ProposalCard />
    </div>
  );
};

export default Index;

import React from 'react';
import { Star } from 'lucide-react';

interface StarBadgeProps {
  toNextStar: number | null;
  stars: number;
}

export const StarBadge: React.FC<StarBadgeProps> = ({ toNextStar, stars }) => {
  // If no remaining flights to next star and has stars (e.g. Dubai, or completed tier)
  if (toNextStar === null) {
    if (stars > 0) {
      return (
        <div className="flex items-center gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
            />
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="inline-flex items-center justify-center min-w-[34px] h-[34px] px-2 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-[#451a03] font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.7)] border border-amber-200/60 select-none">
      {toNextStar}
    </div>
  );
};

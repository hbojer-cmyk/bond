import React from 'react';

interface SegmentedProgressProps {
  current: number;
  target: number;
  totalSegments?: number;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  current,
  target,
  totalSegments = 6,
}) => {
  const fraction = Math.min(1, Math.max(0, current / target));
  const activeSegments = Math.round(fraction * totalSegments);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSegments }).map((_, index) => {
          const isFilled = index < activeSegments;
          return (
            <div
              key={index}
              className={`w-3.5 h-5 rounded-[2px] transition-all duration-300 ${
                isFilled
                  ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.5)] border-t border-amber-200/50'
                  : 'bg-[#152336] border border-[#213754]/50'
              }`}
            />
          );
        })}
      </div>
      <span className="text-amber-400/90 text-sm font-medium tracking-tight min-w-[48px] text-right font-mono">
        {current}/{target}
      </span>
    </div>
  );
};

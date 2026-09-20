import React from 'react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 9999,
}) => {
  return (
    <div className="inline-flex items-center justify-between bg-[#0b1523] border border-[#26415f]/60 rounded-xl px-2.5 py-1 min-w-[76px] h-8 shadow-inner select-none">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (value > min) onDecrement();
        }}
        disabled={value <= min}
        className="text-slate-400 hover:text-cyan-400 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-colors px-1 cursor-pointer font-bold text-sm"
        aria-label="Decrease"
      >
        −
      </button>

      <span className="text-slate-200 font-semibold text-sm tabular-nums px-1 text-center min-w-[24px]">
        {value}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (value < max) onIncrement();
        }}
        disabled={value >= max}
        className="text-slate-400 hover:text-cyan-400 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-colors px-1 cursor-pointer font-bold text-sm"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
};

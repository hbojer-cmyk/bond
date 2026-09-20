import React from 'react';
import { DestinationItem } from '../types';
import { LandmarkIcon } from './Landmarks';
import { SegmentedProgress } from './SegmentedProgress';
import { StarBadge } from './StarBadge';
import { Stepper } from './Stepper';

interface DestinationRowProps {
  item: DestinationItem;
  onUpdateMaps: (id: string, delta: number) => void;
  onUpdateFlights: (id: string, delta: number) => void;
  onSelect?: (item: DestinationItem) => void;
}

export const DestinationRow: React.FC<DestinationRowProps> = ({
  item,
  onUpdateMaps,
  onUpdateFlights,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect?.(item)}
      className="glass-row rounded-2xl px-5 py-3.5 mb-3 flex items-center justify-between gap-4 select-none cursor-pointer hover:border-cyan-500/40 transition-all duration-200"
    >
      {/* 1. Destination */}
      <div className="flex items-center gap-3.5 min-w-[200px] flex-1 max-w-[240px]">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          <LandmarkIcon type={item.landmark || item.id} className="w-9 h-9" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-base tracking-wide group-hover:text-cyan-200 transition-colors">
            {item.name}
          </span>
          <span className="text-[#647f9d] text-xs font-medium bg-[#0f1d2e] px-2 py-0.5 rounded-md border border-[#1b3452]/50 w-fit mt-0.5">
            {item.region}
          </span>
        </div>
      </div>

      {/* 2. Aircraft */}
      <div className="w-[120px] flex justify-center shrink-0">
        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-bold text-cyan-300 bg-gradient-to-r from-cyan-950/60 to-cyan-900/40 border border-cyan-400/50 glow-cyan-pill tracking-wider">
          {item.aircraft}
        </span>
      </div>

      {/* 3. Progress */}
      <div className="w-[170px] shrink-0 flex justify-center">
        <SegmentedProgress current={item.progressCurrent} target={item.progressTarget} />
      </div>

      {/* 4. To Next Star */}
      <div className="w-[110px] shrink-0 flex justify-center">
        <StarBadge toNextStar={item.toNextStar} stars={item.stars} />
      </div>

      {/* 5. Maps */}
      <div className="w-[105px] shrink-0 flex justify-center" onClick={(e) => e.stopPropagation()}>
        <Stepper
          value={item.maps}
          onIncrement={() => onUpdateMaps(item.id, 1)}
          onDecrement={() => onUpdateMaps(item.id, -1)}
        />
      </div>

      {/* 6. Flights */}
      <div className="w-[105px] shrink-0 flex justify-center" onClick={(e) => e.stopPropagation()}>
        <Stepper
          value={item.flights}
          onIncrement={() => onUpdateFlights(item.id, 1)}
          onDecrement={() => onUpdateFlights(item.id, -1)}
        />
      </div>
    </div>
  );
};

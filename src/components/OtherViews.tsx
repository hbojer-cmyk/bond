import React from 'react';
import { Plane, Compass, Fuel, ShieldCheck, Gauge, RotateCcw, TrendingUp, Globe2 } from 'lucide-react';
import { DestinationItem } from '../types';

interface OtherViewsProps {
  section: string;
  destinations: DestinationItem[];
  onResetData: () => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({
  section,
  destinations,
  onResetData,
}) => {
  const totalFlights = destinations.reduce((sum, d) => sum + d.flights, 0);
  const totalMaps = destinations.reduce((sum, d) => sum + d.maps, 0);
  const totalStars = destinations.reduce((sum, d) => sum + d.stars, 0);
  const masteredCount = destinations.filter((d) => d.stars >= 3 || d.progressCurrent >= d.progressTarget).length;

  if (section === 'My Flights') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Flight Operations</h2>
            <p className="text-slate-400 text-sm">Real-time status of dispatched aircraft across international air corridors</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-bold glow-cyan-sm">
            {destinations.length} Active Corridors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((d) => (
            <div key={d.id} className="glass-panel rounded-2xl p-4 border border-[#203955] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="font-bold text-white text-base">{d.name}</span>
                </div>
                <span className="text-xs font-bold text-cyan-300 px-2.5 py-0.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40">
                  {d.aircraft}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Region</span>
                  <span className="text-slate-200 font-medium">{d.region}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Flights</span>
                  <span className="text-amber-400 font-bold font-mono">{d.flights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flight Readiness</span>
                  <span className="text-emerald-400 font-medium">Clear for Takeoff</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'Collections') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h2 className="text-2xl font-bold text-white">Destination Souvenirs & Artifacts</h2>
          <p className="text-slate-400 text-sm">Rare drop items gathered during long-range flights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Ancient Scarab', city: 'Cairo', rarity: 'Legendary', icon: '🪲' },
            { name: 'Gothic Rose Glass', city: 'Paris', rarity: 'Rare', icon: '🌹' },
            { name: 'Origami Crane', city: 'Tokyo', rarity: 'Epic', icon: '🕊️' },
            { name: 'Royal Pocket Watch', city: 'London', rarity: 'Rare', icon: '⏱️' },
            { name: 'Golden Pearl Oyster', city: 'Sydney', rarity: 'Epic', icon: '🦪' },
            { name: 'Carnival Feather', city: 'Rio de Janeiro', rarity: 'Uncommon', icon: '🪶' },
            { name: 'Desert Rose Crystal', city: 'Dubai', rarity: 'Legendary', icon: '💎' },
            { name: 'Liberty Torch Miniature', city: 'New York', rarity: 'Epic', icon: '🗽' },
          ].map((item, i) => (
            <div key={i} className="glass-panel rounded-2xl p-4 border border-[#203955] text-center group hover:border-amber-400/50 transition-all">
              <div className="text-4xl mb-3 filter drop-shadow-md group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-white font-bold text-sm">{item.name}</h4>
              <p className="text-slate-400 text-xs mt-0.5">{item.city}</p>
              <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-500/40">
                {item.rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'Aircraft') {
    const fleet = [
      { name: 'Swallow', role: 'Regional Scout', speed: '480 km/h', capacity: '24 Pax', fuel: '1800 L', icon: Plane, glow: 'glow-cyan-pill' },
      { name: 'Owl', role: 'Night Cruiser', speed: '560 km/h', capacity: '36 Pax', fuel: '2600 L', icon: Compass, glow: 'glow-cyan-pill' },
      { name: 'Jumbo', role: 'Heavy Intercontinental', speed: '920 km/h', capacity: '120 Pax', fuel: '8400 L', icon: Gauge, glow: 'glow-cyan-pill' },
      { name: 'Swift', role: 'High-Altitude Express', speed: '780 km/h', capacity: '60 Pax', fuel: '4200 L', icon: ShieldCheck, glow: 'glow-cyan-pill' },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h2 className="text-2xl font-bold text-white">Fleet Hangar & Specifications</h2>
          <p className="text-slate-400 text-sm">Review operational aircraft assigned across active flight tracks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fleet.map((plane) => {
            const Icon = plane.icon;
            const assignedCount = destinations.filter(d => d.aircraft === plane.name).length;

            return (
              <div key={plane.name} className="glass-panel rounded-3xl p-6 border border-[#234266] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-400 glow-cyan-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{plane.name}</h3>
                        <span className="text-slate-400 text-xs">{plane.role}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 glow-cyan-sm">
                      {assignedCount} Assigned
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="bg-[#091523] p-3 rounded-xl border border-[#1b3149]">
                      <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Cruising Speed</span>
                      <span className="text-white font-bold text-sm font-mono mt-0.5 block">{plane.speed}</span>
                    </div>
                    <div className="bg-[#091523] p-3 rounded-xl border border-[#1b3149]">
                      <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Payload</span>
                      <span className="text-white font-bold text-sm font-mono mt-0.5 block">{plane.capacity}</span>
                    </div>
                    <div className="bg-[#091523] p-3 rounded-xl border border-[#1b3149]">
                      <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Fuel Burn</span>
                      <span className="text-amber-400 font-bold text-sm font-mono mt-0.5 block">{plane.fuel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#182b40] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Fuel className="w-3.5 h-3.5" /> Maintenance Cleared
                  </span>
                  <span className="text-slate-500">Tier 1 Certified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (section === 'Statistics') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h2 className="text-2xl font-bold text-white">Flight Telemetry & Statistics</h2>
          <p className="text-slate-400 text-sm">Aggregated operational metrics across global routes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-[#203955]">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Total Flights</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-cyan-400 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{totalFlights}</span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5"><TrendingUp className="w-3.5 h-3.5" /> +12%</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-[#203955]">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Maps Gathered</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-amber-400 font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">{totalMaps}</span>
              <span className="text-slate-500 text-xs">navigation stock</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-[#203955]">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Stars Unlocked</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-amber-300 font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">{totalStars}</span>
              <span className="text-slate-400 text-xs">/ 32 global</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-[#203955]">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Mastered Cities</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white font-mono">{masteredCount}</span>
              <span className="text-slate-500 text-xs">of {destinations.length} routes</span>
            </div>
          </div>
        </div>

        {/* Breakdown by Aircraft */}
        <div className="glass-panel rounded-3xl p-6 border border-[#203955]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            Flights Distribution by Aircraft
          </h3>
          <div className="space-y-4">
            {(['Swallow', 'Owl', 'Jumbo', 'Swift'] as const).map(ac => {
              const flightsForAc = destinations.filter(d => d.aircraft === ac).reduce((s, d) => s + d.flights, 0);
              const percentage = totalFlights > 0 ? Math.round((flightsForAc / totalFlights) * 100) : 0;
              return (
                <div key={ac}>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-cyan-300">{ac}</span>
                    <span className="text-slate-400 font-mono">{flightsForAc} flights ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#091523] rounded-full overflow-hidden border border-[#1b3149]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (section === 'Settings') {
    return (
      <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings & Data Management</h2>
          <p className="text-slate-400 text-sm">Configure tracker interface preferences and local storage</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-[#203955] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1b3149]">
            <div>
              <h4 className="text-white font-bold text-sm">Audio Feedback & Chimes</h4>
              <p className="text-slate-400 text-xs">Play subtle audio click sounds when stepping flights or maps</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-[#1b3149]">
            <div>
              <h4 className="text-white font-bold text-sm">Confetti on Star Unlock</h4>
              <p className="text-slate-400 text-xs">Trigger festive celebration particles when a star milestone is achieved</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h4 className="text-rose-300 font-bold text-sm flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                Reset Data to Initial Image State
              </h4>
              <p className="text-slate-400 text-xs">Restore original flight numbers and progress as shown in the screenshot</p>
            </div>
            <button
              onClick={onResetData}
              className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 hover:bg-rose-900/80 hover:text-white font-semibold text-xs transition-all cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.2)]"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

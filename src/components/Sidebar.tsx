import React from 'react';
import {
  LayoutDashboard,
  PlaneTakeoff,
  FolderKanban,
  Plane,
  BarChart3,
  Settings,
  Send,
} from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'My Flights', label: 'My Flights', icon: PlaneTakeoff },
    { id: 'Collections', label: 'Collections', icon: FolderKanban },
    { id: 'Aircraft', label: 'Aircraft', icon: Plane },
    { id: 'Statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <aside className="w-64 bg-[#08111c] border-r border-[#1a2d42]/70 flex flex-col justify-between py-6 px-4 h-full shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-3 py-2 mb-8">
          <div className="relative flex items-center justify-center">
            {/* Cyan glowing paper plane / jet icon */}
            <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-400/40 glow-cyan-sm text-cyan-400">
              <Send className="w-6 h-6 -rotate-45 translate-x-0.5 -translate-y-0.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-cyan-400 font-extrabold text-xl tracking-wider drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              AC
            </span>
            <span className="text-white font-bold text-xl tracking-wide">
              TRACKER
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/70 to-[#0e2436] text-cyan-300 border border-cyan-400/40 glow-cyan shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#101f30]/60 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile at Bottom */}
      <div className="pt-6 border-t border-[#16273b]/80">
        <div className="flex items-center gap-3.5 px-3 py-2 rounded-2xl hover:bg-[#0f1d2c] transition-colors cursor-pointer group">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alex C."
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#08111c] rounded-full shadow-[0_0_6px_#34d399]" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">
              Alex C.
            </span>
            <span className="text-slate-500 text-xs">Senior Pilot</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

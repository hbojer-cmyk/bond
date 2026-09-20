import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Search, Plus } from 'lucide-react';
import { DestinationItem, NavSection } from './types';
import { INITIAL_DESTINATIONS } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { DestinationRow } from './components/DestinationRow';
import { AddDestinationModal } from './components/AddDestinationModal';
import { OtherViews } from './components/OtherViews';

export const App: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationItem[]>(() => {
    const saved = localStorage.getItem('ac_tracker_destinations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved destinations', e);
      }
    }
    return INITIAL_DESTINATIONS;
  });

  const [activeSection, setActiveSection] = useState<NavSection>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('ac_tracker_destinations', JSON.stringify(destinations));
  }, [destinations]);

  // Audio click sound using Web Audio API for zero-asset tactile clicks
  const playClickSound = (pitch = 600) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch / 2, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const fireStarConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#00F0FF', '#38BDF8', '#FFFFFF'],
    });
  };

  const handleUpdateMaps = (id: string, delta: number) => {
    playClickSound(delta > 0 ? 750 : 450);
    setDestinations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newMaps = Math.max(0, item.maps + delta);
          return { ...item, maps: newMaps };
        }
        return item;
      })
    );
  };

  const handleUpdateFlights = (id: string, delta: number) => {
    playClickSound(delta > 0 ? 880 : 520);
    setDestinations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newFlights = Math.max(0, item.flights + delta);
          let newProgress = item.progressCurrent;
          let newToNextStar = item.toNextStar;
          let newStars = item.stars;

          if (delta > 0) {
            newProgress = Math.min(item.progressTarget, item.progressCurrent + 1);
            if (newToNextStar !== null && newToNextStar > 0) {
              newToNextStar = newToNextStar - 1;
              if (newToNextStar === 0) {
                newStars = item.stars + 1;
                fireStarConfetti();
              }
            }
          } else if (delta < 0) {
            newProgress = Math.max(0, item.progressCurrent - 1);
            if (newToNextStar !== null) {
              newToNextStar = newToNextStar + 1;
            }
          }

          return {
            ...item,
            flights: newFlights,
            progressCurrent: newProgress,
            toNextStar: newToNextStar,
            stars: newStars,
          };
        }
        return item;
      })
    );
  };

  const handleAddDestination = (newItem: DestinationItem) => {
    setDestinations((prev) => [newItem, ...prev]);
    fireStarConfetti();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all destinations back to the original image state?')) {
      setDestinations(INITIAL_DESTINATIONS);
      localStorage.removeItem('ac_tracker_destinations');
    }
  };

  // Filter destinations
  const filteredDestinations = destinations.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aircraft.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All' ||
      (selectedRegion === 'Europe' && item.region === 'Europe') ||
      (selectedRegion === 'Asia' && item.region === 'Asia') ||
      (selectedRegion === 'Americas' && (item.region === 'North America' || item.region === 'South America')) ||
      (selectedRegion === 'Africa & ME' && (item.region === 'North Africa' || item.region === 'Middle East')) ||
      (selectedRegion === 'Oceania' && item.region === 'Oceania');

    return matchesQuery && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-[#070d16] flex items-center justify-center p-3 md:p-6 lg:p-8 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-900/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Application Wrapper */}
      <div className="w-full max-w-[1240px] h-[92vh] max-h-[920px] bg-[#0c1624]/95 border border-[#1d334d]/60 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl flex overflow-hidden relative z-10">
        {/* Left Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Right Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-[#0b1626]/80 to-[#09121e]/90">
          {activeSection === 'Dashboard' ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden p-6 md:p-8">
              {/* Top Action / Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#182b40]/70 shrink-0">
                <div className="flex items-center gap-3">
                  {/* Search box */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search destination, aircraft..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#08121d] border border-[#1b3149] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 w-56 md:w-64 transition-all"
                    />
                  </div>

                  {/* Region filter pills */}
                  <div className="hidden lg:flex items-center gap-1.5 bg-[#08121d] p-1 rounded-xl border border-[#182a3d]">
                    {['All', 'Europe', 'Asia', 'Americas', 'Africa & ME', 'Oceania'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          selectedRegion === r
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400/40 glow-cyan-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right controls: Add Route */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-900/60 font-bold text-xs glow-cyan-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Route</span>
                  </button>
                </div>
              </div>

              {/* Table Column Headers matching the screenshot */}
              <div className="px-5 py-3.5 flex items-center justify-between gap-4 text-[11px] font-bold tracking-widest text-[#5c728a] uppercase select-none shrink-0">
                <div className="min-w-[200px] flex-1 max-w-[240px]">DESTINATION</div>
                <div className="w-[120px] text-center shrink-0">AIRCRAFT</div>
                <div className="w-[170px] text-center shrink-0">PROGRESS</div>
                <div className="w-[110px] text-center shrink-0">TO NEXT STAR</div>
                <div className="w-[105px] text-center shrink-0">MAPS</div>
                <div className="w-[105px] text-center shrink-0">FLIGHTS</div>
              </div>

              {/* Destination Scrollable List */}
              <div className="flex-1 overflow-y-auto pr-1">
                {filteredDestinations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                    <p className="text-sm">No destinations found matching filter.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion('All');
                      }}
                      className="mt-3 text-cyan-400 text-xs hover:underline cursor-pointer"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredDestinations.map((item) => (
                    <DestinationRow
                      key={item.id}
                      item={item}
                      onUpdateMaps={handleUpdateMaps}
                      onUpdateFlights={handleUpdateFlights}
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full overflow-y-auto p-6 md:p-8">
              <OtherViews
                section={activeSection}
                destinations={destinations}
                onResetData={handleResetData}
              />
            </div>
          )}
        </main>
      </div>

      {/* Add Destination Modal */}
      <AddDestinationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDestination}
      />
    </div>
  );
};

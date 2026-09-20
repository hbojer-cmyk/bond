import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { AircraftType, DestinationItem } from '../types';

interface AddDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: DestinationItem) => void;
}

export const AddDestinationModal: React.FC<AddDestinationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Europe');
  const [aircraft, setAircraft] = useState<AircraftType>('Swallow');
  const [progressTarget, setProgressTarget] = useState(50);
  const [maps, setMaps] = useState(10);
  const [flights, setFlights] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: DestinationItem = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      region,
      aircraft,
      progressCurrent: 0,
      progressTarget,
      toNextStar: progressTarget,
      stars: 0,
      maps,
      flights,
      landmark: 'cairo', // fallback icon
    };

    onAdd(newItem);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0e1b2b] border border-[#264468] rounded-3xl p-6 w-full max-w-md shadow-2xl glow-card animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#1c324c]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" />
            Add New Destination
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              City Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rome, Singapore, Berlin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Region / Continent
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
                <option value="Middle East">Middle East</option>
                <option value="Africa">Africa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Assigned Aircraft
              </label>
              <select
                value={aircraft}
                onChange={(e) => setAircraft(e.target.value as AircraftType)}
                className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3 py-2.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
              >
                <option value="Swallow">Swallow</option>
                <option value="Owl">Owl</option>
                <option value="Jumbo">Jumbo</option>
                <option value="Swift">Swift</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Star Target
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={progressTarget}
                onChange={(e) => setProgressTarget(Number(e.target.value))}
                className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Initial Maps
              </label>
              <input
                type="number"
                min="0"
                value={maps}
                onChange={(e) => setMaps(Number(e.target.value))}
                className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Initial Flights
              </label>
              <input
                type="number"
                min="0"
                value={flights}
                onChange={(e) => setFlights(Number(e.target.value))}
                className="w-full bg-[#08121d] border border-[#1e344e] rounded-xl px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#1c324c]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Add Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';

interface LandmarkProps {
  type: string;
  className?: string;
}

export const LandmarkIcon: React.FC<LandmarkProps> = ({ type, className = "w-10 h-10" }) => {
  switch (type.toLowerCase()) {
    case 'cairo':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Pyramid */}
          <polygon points="24,10 40,38 24,38" fill="#D97706" />
          <polygon points="24,10 24,38 8,38" fill="#FBBF24" />
          {/* Secondary Pyramid */}
          <polygon points="36,18 46,38 36,38" fill="#B45309" opacity="0.8" />
          <polygon points="36,18 36,38 28,38" fill="#F59E0B" opacity="0.8" />
          {/* Base shadow */}
          <ellipse cx="26" cy="38.5" rx="19" ry="2.5" fill="#0c1826" opacity="0.6" />
        </svg>
      );

    case 'paris':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spire */}
          <line x1="24" y1="4" x2="24" y2="12" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="23,12 25,12 26,20 22,20" fill="#92400E" />
          <rect x="20" y="20" width="8" height="2" rx="0.5" fill="#D97706" />
          {/* Middle tier */}
          <polygon points="22,22 26,22 28,31 20,31" fill="#78350F" />
          <rect x="17" y="31" width="14" height="2.5" rx="0.5" fill="#B45309" />
          {/* Bottom legs & arch */}
          <path d="M19 33.5 L13 43 H17 L21 33.5" fill="#92400E" />
          <path d="M29 33.5 L35 43 H31 L27 33.5" fill="#78350F" />
          <path d="M19 43 Q24 35 29 43 Z" fill="#0f1f33" />
        </svg>
      );

    case 'tokyo':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Torii Top curved bar (Kasagi) */}
          <path d="M6 14 Q24 9 42 14 L40 18 Q24 14 8 18 Z" fill="#DC2626" />
          <path d="M5 13 Q24 8 43 13 L43 14 Q24 9 5 14 Z" fill="#EF4444" />
          {/* Secondary lintel (Shimaki) */}
          <rect x="10" y="20" width="28" height="3" rx="0.5" fill="#B91C1C" />
          {/* Central tablet (Gakuzuka) */}
          <rect x="22.5" y="16" width="3" height="5" fill="#1E293B" />
          {/* Pillars */}
          <polygon points="14,20 17,20 18,42 13,42" fill="#DC2626" />
          <polygon points="34,20 31,20 30,42 35,42" fill="#991B1B" />
          {/* Base stones */}
          <rect x="12" y="40" width="7" height="3" rx="1" fill="#334155" />
          <rect x="29" y="40" width="7" height="3" rx="1" fill="#334155" />
        </svg>
      );

    case 'london':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elizabeth Tower / Big Ben */}
          {/* Spire */}
          <polygon points="24,5 21,15 27,15" fill="#D97706" />
          <line x1="24" y1="2" x2="24" y2="6" stroke="#FBBF24" strokeWidth="1.5" />
          {/* Clock section */}
          <rect x="19" y="15" width="10" height="11" rx="0.5" fill="#B45309" />
          <circle cx="24" cy="20.5" r="3.5" fill="#FEF3C7" stroke="#78350F" strokeWidth="1" />
          <line x1="24" y1="20.5" x2="24" y2="18.5" stroke="#1E293B" strokeWidth="0.8" />
          <line x1="24" y1="20.5" x2="25.5" y2="20.5" stroke="#1E293B" strokeWidth="0.8" />
          {/* Main shaft */}
          <rect x="20" y="26" width="8" height="17" fill="#92400E" />
          <line x1="22.5" y1="26" x2="22.5" y2="43" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />
          <line x1="25.5" y1="26" x2="25.5" y2="43" stroke="#78350F" strokeWidth="0.8" opacity="0.8" />
          <rect x="18" y="42" width="12" height="2" rx="0.5" fill="#78350F" />
        </svg>
      );

    case 'sydney':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sydney Opera House Sails */}
          {/* Back shell */}
          <path d="M12 37 C15 25, 23 20, 26 37 Z" fill="#CBD5E1" opacity="0.6" />
          {/* Main front shells */}
          <path d="M15 37 C18 20, 28 17, 32 37 Z" fill="#E2E8F0" />
          <path d="M22 37 C24 16, 33 14, 37 37 Z" fill="#F8FAFC" />
          <path d="M30 37 C32 23, 39 21, 42 37 Z" fill="#E2E8F0" opacity="0.9" />
          {/* Base / Podium & harbour reflection */}
          <rect x="8" y="37" width="35" height="3" rx="1" fill="#475569" />
          <path d="M9 41 L39 41" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
        </svg>
      );

    case 'rio':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Christ the Redeemer */}
          {/* Mountain / Corcovado base */}
          <path d="M16 43 Q24 33 32 43 Z" fill="#1E293B" />
          {/* Pedestal */}
          <rect x="22" y="32" width="4" height="6" rx="0.5" fill="#64748B" />
          {/* Robe / Body */}
          <polygon points="23,17 25,17 26.5,32 21.5,32" fill="#94A3B8" />
          {/* Head */}
          <circle cx="24" cy="14" r="2.2" fill="#CBD5E1" />
          {/* Outstretched Arms */}
          <path d="M10 18 Q16 17.5 24 18 Q32 17.5 38 18 L38 20 Q32 19.5 24 20 Q16 19.5 10 20 Z" fill="#CBD5E1" />
        </svg>
      );

    case 'dubai':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Burj Khalifa Needle */}
          {/* Needle Spire */}
          <line x1="24" y1="2" x2="24" y2="12" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
          {/* Top tiered tower */}
          <polygon points="23.5,12 24.5,12 25,20 23,20" fill="#CBD5E1" />
          <polygon points="23,20 25,20 25.5,28 22.5,28" fill="#94A3B8" />
          {/* Middle tier */}
          <polygon points="22,28 26,28 26.5,35 21.5,35" fill="#64748B" />
          {/* Lower tier */}
          <polygon points="21,35 27,35 28,43 20,43" fill="#475569" />
          {/* Architectural highlights */}
          <line x1="24" y1="12" x2="24" y2="43" stroke="#F1F5F9" strokeWidth="0.8" opacity="0.7" />
        </svg>
      );

    case 'newyork':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Statue of Liberty (Verdigris Patina Green) */}
          {/* Torch flame */}
          <circle cx="30" cy="9" r="1.8" fill="#F59E0B" />
          <path d="M29 11 L31 11 L30.5 14 L29.5 14 Z" fill="#D97706" />
          {/* Raised Right Arm */}
          <line x1="27" y1="18" x2="30" y2="13" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />
          {/* Crown & Head */}
          <circle cx="23.5" cy="14" r="2.4" fill="#6EE7B7" />
          <polygon points="21,12 26,12 25,13.5 22,13.5" fill="#10B981" />
          {/* Spikes on crown */}
          <line x1="21.5" y1="12.5" x2="20" y2="11" stroke="#34D399" strokeWidth="1" />
          <line x1="23.5" y1="11.5" x2="23.5" y2="9.5" stroke="#34D399" strokeWidth="1" />
          <line x1="25.5" y1="12.5" x2="27" y2="11" stroke="#34D399" strokeWidth="1" />
          {/* Body and Drapes */}
          <polygon points="21,17 26,17 27,38 19,38" fill="#10B981" />
          <path d="M22 17 L21 38" stroke="#059669" strokeWidth="1" />
          <path d="M25 17 L25.5 38" stroke="#34D399" strokeWidth="1" />
          {/* Pedestal */}
          <rect x="17" y="38" width="12" height="4" rx="1" fill="#475569" />
        </svg>
      );

    default:
      return (
        <div className={`${className} rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-xs`}>
          ✈
        </div>
      );
  }
};

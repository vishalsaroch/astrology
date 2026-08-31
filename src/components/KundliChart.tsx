import React, { useState } from 'react';
import { KundliData, PlanetPosition } from '../types';
import { ZODIAC_SIGNS } from '../services/astrology/ephemeris';

interface KundliChartProps {
  kundli: KundliData;
  chartType?: 'D1' | 'D9' | string;
  className?: string;
  styleMode?: 'north' | 'south';
}

export const KundliChart: React.FC<KundliChartProps> = ({
  kundli,
  chartType = 'D1',
  className = '',
  styleMode = 'north'
}) => {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [activeStyle, setActiveStyle] = useState<'north' | 'south'>(styleMode);

  const chart = kundli.divisionalCharts[chartType] || kundli.divisionalCharts['D1'];
  const lagnaSignIndex = chart ? chart.lagnaSignIndex : kundli.ascendant.signIndex;

  // Map planets to houses based on current divisional chart
  const housePlanets: Record<number, PlanetPosition[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }

  if (chart && chart.planetsInHouses) {
    Object.entries(chart.planetsInHouses).forEach(([hNum, pNames]) => {
      const h = Number(hNum);
      if (Array.isArray(pNames)) {
        pNames.forEach((pName: string) => {
          const fullPlanet = kundli.planets.find(p => p.name === pName);
          if (fullPlanet) {
            housePlanets[h].push(fullPlanet);
          }
        });
      }
    });
  } else {
    kundli.planets.forEach(p => {
      if (housePlanets[p.house]) {
        housePlanets[p.house].push(p);
      }
    });
  }

  // Get sign number for each house (1 to 12 in North Indian chart)
  const getHouseSignIndex = (houseNumber: number) => {
    return (lagnaSignIndex + houseNumber - 1) % 12;
  };

  // North Indian Chart Coordinates (Standard Diamond Chart 400x400)
  // House Centers for Text Placement
  const houseCenterCoordinates: Record<number, { x: number; y: number }> = {
    1: { x: 200, y: 100 },
    2: { x: 100, y: 50 },
    3: { x: 50, y: 100 },
    4: { x: 100, y: 200 },
    5: { x: 50, y: 300 },
    6: { x: 100, y: 350 },
    7: { x: 200, y: 300 },
    8: { x: 300, y: 350 },
    9: { x: 350, y: 300 },
    10: { x: 300, y: 200 },
    11: { x: 350, y: 100 },
    12: { x: 300, y: 50 }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Chart Style Switcher Tabs */}
      <div className="flex items-center justify-between w-full max-w-[420px] mb-3 px-2">
        <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-lg border border-stone-700/60 text-xs">
          <button
            onClick={() => setActiveStyle('north')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeStyle === 'north'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            North Indian (Diamond)
          </button>
          <button
            onClick={() => setActiveStyle('south')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeStyle === 'south'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            South Indian (Square)
          </button>
        </div>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
          {chart?.name || 'Rashi Chart (D1)'}
        </span>
      </div>

      {/* Render Chart Mode */}
      <div className="relative w-full max-w-[420px] aspect-square bg-gradient-to-b from-stone-900 to-stone-950 p-2 rounded-2xl border border-amber-500/30 shadow-2xl shadow-black/40 overflow-hidden">
        {activeStyle === 'north' ? (
          /* NORTH INDIAN DIAMOND CHART SVG */
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>
              <linearGradient id="activeHouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.25)" />
                <stop offset="100%" stopColor="rgba(217, 119, 6, 0.15)" />
              </linearGradient>
            </defs>

            {/* Background Rect */}
            <rect x="2" y="2" width="396" height="396" fill="url(#chartBg)" stroke="#b45309" strokeWidth="2" rx="8" />

            {/* North Indian Geometric Lines */}
            {/* Outer Diamond */}
            <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="#d97706" strokeWidth="1.5" />
            
            {/* Main Diagonal Cross Lines */}
            <line x1="0" y1="0" x2="400" y2="400" stroke="#d97706" strokeWidth="1.5" />
            <line x1="400" y1="0" x2="0" y2="400" stroke="#d97706" strokeWidth="1.5" />

            {/* Inner Center Rhombus (Connecting midpoints of diagonals) */}
            <line x1="100" y1="100" x2="300" y2="100" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="300" y1="100" x2="300" y2="300" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="300" y1="300" x2="100" y2="300" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="100" y1="300" x2="100" y2="100" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2,2" />

            {/* Interactive House Regions (1 to 12) */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(houseNum => {
              const center = houseCenterCoordinates[houseNum];
              const signIdx = getHouseSignIndex(houseNum);
              const signName = ZODIAC_SIGNS[signIdx].name;
              const signNumberDisplay = signIdx + 1; // 1=Aries, 2=Taurus...
              const planets = housePlanets[houseNum] || [];
              const isSelected = selectedHouse === houseNum;

              return (
                <g
                  key={houseNum}
                  onClick={() => setSelectedHouse(isSelected ? null : houseNum)}
                  className="cursor-pointer group"
                >
                  {/* Sign Number Tag in the House (Vedic Standard) */}
                  <text
                    x={center.x}
                    y={center.y - 24}
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="11"
                    fontWeight="bold"
                    className="opacity-90 group-hover:fill-amber-300"
                  >
                    {signNumberDisplay}
                  </text>

                  {/* House Label */}
                  <text
                    x={center.x}
                    y={center.y - 36}
                    textAnchor="middle"
                    fill="#78716c"
                    fontSize="8"
                    className="font-mono"
                  >
                    H{houseNum} {houseNum === 1 ? '(Lagna)' : ''}
                  </text>

                  {/* Planets List in this House */}
                  {planets.length === 0 ? (
                    <text
                      x={center.x}
                      y={center.y + 4}
                      textAnchor="middle"
                      fill="#57534e"
                      fontSize="9"
                      fontStyle="italic"
                    >
                      —
                    </text>
                  ) : (
                    planets.map((p, pIdx) => {
                      const yOffset = center.y - 6 + pIdx * 14;
                      const isRetro = p.isRetrograde;
                      const isComb = p.isCombust;
                      const isExalt = p.status === 'Exalted';
                      const isDebl = p.status === 'Debilitated';

                      let planetColor = '#fef08a'; // default bright yellow/gold
                      if (['Sun', 'Mars'].includes(p.name)) planetColor = '#f87171'; // warm reddish
                      if (['Moon', 'Venus'].includes(p.name)) planetColor = '#e0e7ff'; // luminous white/blue
                      if (['Jupiter'].includes(p.name)) planetColor = '#fde047'; // golden
                      if (['Mercury'].includes(p.name)) planetColor = '#86efac'; // soft emerald
                      if (['Saturn', 'Rahu', 'Ketu'].includes(p.name)) planetColor = '#cbd5e1'; // cool silver

                      return (
                        <text
                          key={p.name}
                          x={center.x}
                          y={yOffset}
                          textAnchor="middle"
                          fill={planetColor}
                          fontSize="10"
                          fontWeight="bold"
                          className="drop-shadow-sm"
                        >
                          {p.name.substring(0, 2)}
                          {isRetro ? <tspan fill="#f97316" fontSize="8">®</tspan> : null}
                          {isComb ? <tspan fill="#ef4444" fontSize="8">*</tspan> : null}
                          {isExalt ? <tspan fill="#22c55e" fontSize="8">↑</tspan> : null}
                          {isDebl ? <tspan fill="#f43f5e" fontSize="8">↓</tspan> : null}
                        </text>
                      );
                    })
                  )}
                </g>
              );
            })}
          </svg>
        ) : (
          /* SOUTH INDIAN SQUARE CHART SVG */
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="southBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>
            </defs>

            <rect x="2" y="2" width="396" height="396" fill="url(#southBg)" stroke="#b45309" strokeWidth="2" rx="8" />

            {/* South Indian 4x4 Grid with Hollow 2x2 Center */}
            <line x1="100" y1="0" x2="100" y2="400" stroke="#d97706" strokeWidth="1.5" />
            <line x1="200" y1="0" x2="200" y2="100" stroke="#d97706" strokeWidth="1.5" />
            <line x1="200" y1="300" x2="200" y2="400" stroke="#d97706" strokeWidth="1.5" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="#d97706" strokeWidth="1.5" />

            <line x1="0" y1="100" x2="400" y2="100" stroke="#d97706" strokeWidth="1.5" />
            <line x1="0" y1="200" x2="100" y2="200" stroke="#d97706" strokeWidth="1.5" />
            <line x1="300" y1="200" x2="400" y2="200" stroke="#d97706" strokeWidth="1.5" />
            <line x1="0" y1="300" x2="400" y2="300" stroke="#d97706" strokeWidth="1.5" />

            {/* South Indian Fixed Signs:
                Row 1: Pisces(11), Aries(0), Taurus(1), Gemini(2)
                Row 2: Aquarius(10), [CENTER], Cancer(3)
                Row 3: Capricorn(9), [CENTER], Leo(4)
                Row 4: Sagittarius(8), Scorpio(7), Libra(6), Virgo(5)
            */}
            {[
              { signIdx: 11, x: 50, y: 50 },
              { signIdx: 0, x: 150, y: 50 },
              { signIdx: 1, x: 250, y: 50 },
              { signIdx: 2, x: 350, y: 50 },
              { signIdx: 10, x: 50, y: 150 },
              { signIdx: 3, x: 350, y: 150 },
              { signIdx: 9, x: 50, y: 250 },
              { signIdx: 4, x: 350, y: 250 },
              { signIdx: 8, x: 50, y: 350 },
              { signIdx: 7, x: 150, y: 350 },
              { signIdx: 6, x: 250, y: 350 },
              { signIdx: 5, x: 350, y: 350 }
            ].map(({ signIdx, x, y }) => {
              const isLagna = signIdx === lagnaSignIndex;
              const houseNum = ((signIdx - lagnaSignIndex + 12) % 12) + 1;
              const planets = housePlanets[houseNum] || [];

              return (
                <g key={signIdx} className="cursor-pointer group">
                  <text x={x} y={y - 25} textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                    {ZODIAC_SIGNS[signIdx].name.substring(0, 3)}
                    {isLagna ? <tspan fill="#ef4444" fontSize="9"> (Asc)</tspan> : ''}
                  </text>

                  {planets.length === 0 ? (
                    <text x={x} y={y + 5} textAnchor="middle" fill="#57534e" fontSize="9">
                      —
                    </text>
                  ) : (
                    planets.map((p, pIdx) => (
                      <text
                        key={p.name}
                        x={x}
                        y={y - 8 + pIdx * 13}
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="9.5"
                        fontWeight="bold"
                      >
                        {p.name.substring(0, 2)}
                      </text>
                    ))
                  )}
                </g>
              );
            })}

            {/* South Indian Center Label */}
            <text x="200" y="195" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold" fontFamily="Cinzel, serif">
              {kundli.birthDetails.name || 'Kundli'}
            </text>
            <text x="200" y="215" textAnchor="middle" fill="#a8a29e" fontSize="10">
              {chart?.name || 'Rashi D1'}
            </text>
          </svg>
        )}
      </div>

      {/* House Inspector Tooltip / Details Panel */}
      {selectedHouse && (
        <div className="mt-3 p-3 w-full max-w-[420px] bg-stone-900/90 border border-amber-500/40 rounded-xl text-xs text-stone-200 shadow-xl animate-in fade-in slide-in-from-top-1">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-stone-800">
            <span className="font-bold text-amber-300">
              House {selectedHouse} ({ZODIAC_SIGNS[getHouseSignIndex(selectedHouse)].name} - Lord:{' '}
              {ZODIAC_SIGNS[getHouseSignIndex(selectedHouse)].lord})
            </span>
            <button
              onClick={() => setSelectedHouse(null)}
              className="text-stone-400 hover:text-stone-200 px-1 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-stone-300">
              <span className="font-semibold text-stone-400">Significance:</span>{' '}
              {kundli.houses[selectedHouse - 1]?.significance}
            </p>
            <p className="text-stone-300">
              <span className="font-semibold text-stone-400">Occupying Planets:</span>{' '}
              {housePlanets[selectedHouse]?.length
                ? housePlanets[selectedHouse].map(p => `${p.name} (${p.degreeFormatted})`).join(', ')
                : 'None (Vacant House)'}
            </p>
            {kundli.houses[selectedHouse - 1]?.aspects?.length > 0 && (
              <p className="text-stone-400 text-[11px]">
                <span className="font-semibold text-amber-400">Aspects on House:</span>{' '}
                {kundli.houses[selectedHouse - 1].aspects.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-[10px] text-stone-400">
        <span className="flex items-center gap-1"><span className="text-orange-400 font-bold">®</span> Retrograde</span>
        <span className="flex items-center gap-1"><span className="text-red-400 font-bold">*</span> Combust</span>
        <span className="flex items-center gap-1"><span className="text-emerald-400 font-bold">↑</span> Exalted</span>
        <span className="flex items-center gap-1"><span className="text-rose-400 font-bold">↓</span> Debilitated</span>
      </div>
    </div>
  );
};

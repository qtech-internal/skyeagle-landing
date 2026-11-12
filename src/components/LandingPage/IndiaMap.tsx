import { useState } from 'react';

interface CityPoint {
  id: string;
  name: string;
  region: string;
  x: number; // percentage in SVG viewBox
  y: number; // percentage in SVG viewBox
  retailers: number;
  devices: string;
  isHQ?: boolean;
}

const citiesData: CityPoint[] = [
  { id: 'ludhiana', name: 'Ludhiana', region: 'Punjab (HQ)', x: 148, y: 112, retailers: 64, devices: '520+ active', isHQ: true },
  { id: 'chandigarh', name: 'Chandigarh', region: 'Punjab / Tri-city', x: 165, y: 118, retailers: 38, devices: '310+ active' },
  { id: 'delhi', name: 'Delhi NCR', region: 'National Capital', x: 172, y: 152, retailers: 85, devices: '780+ active' },
  { id: 'jaipur', name: 'Jaipur', region: 'Rajasthan', x: 140, y: 178, retailers: 42, devices: '340+ active' },
  { id: 'mumbai', name: 'Mumbai', region: 'Maharashtra', x: 112, y: 310, retailers: 76, devices: '640+ active' },
  { id: 'hyderabad', name: 'Hyderabad', region: 'Telangana', x: 202, y: 325, retailers: 49, devices: '410+ active' },
  { id: 'bengaluru', name: 'Bengaluru', region: 'Karnataka', x: 184, y: 405, retailers: 58, devices: '490+ active' }
];

export default function IndiaMap() {
  const [activeCity, setActiveCity] = useState<CityPoint>(citiesData[0]);

  return (
    <div className="fl-map-container">
      {/* City Selector List */}
      <div className="fl-map-city-list">
        {citiesData.map((city) => (
          <button
            key={city.id}
            className={`fl-map-city-btn ${activeCity.id === city.id ? 'active' : ''} ${city.isHQ ? 'is-hq' : ''}`}
            onClick={() => setActiveCity(city)}
            onMouseEnter={() => setActiveCity(city)}
          >
            <div className="fl-city-meta">
              <span className="fl-city-dot" />
              <strong>{city.name}</strong>
              {city.isHQ && <span className="fl-hq-badge">HQ</span>}
            </div>
            <span className="fl-city-stat">{city.devices}</span>
          </button>
        ))}
      </div>

      {/* Futuristic Animated SVG Map */}
      <div className="fl-map-canvas-wrapper">
        <svg
          viewBox="0 0 380 470"
          className="fl-india-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow filters */}
            <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* India Boundary Gradient */}
            <linearGradient id="indiaBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="indiaFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f2648" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#071224" stopOpacity="0.25" />
            </linearGradient>

            {/* Radar Pulse Animation */}
            <radialGradient id="hqPulseGrad">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Tech Grid */}
          <g className="fl-map-grid" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8">
            <line x1="30" y1="100" x2="350" y2="100" />
            <line x1="30" y1="200" x2="350" y2="200" />
            <line x1="30" y1="300" x2="350" y2="300" />
            <line x1="30" y1="400" x2="350" y2="400" />
            <line x1="100" y1="30" x2="100" y2="440" />
            <line x1="200" y1="30" x2="200" y2="440" />
            <line x1="300" y1="30" x2="300" y2="440" />
          </g>

          {/* India Stylized Vector Path Silhouette */}
          <path
            d="M 135 25 
               C 150 18, 168 22, 178 38 
               C 188 52, 205 60, 218 72 
               C 225 82, 240 85, 255 88
               C 270 92, 290 85, 310 95
               C 335 108, 345 130, 335 145
               C 320 152, 305 160, 295 178
               C 285 190, 290 205, 280 220
               C 265 235, 255 240, 245 258
               C 238 275, 242 295, 235 315
               C 228 335, 222 360, 210 385
               C 198 410, 185 435, 178 448
               C 172 435, 160 405, 150 375
               C 140 348, 130 330, 118 305
               C 105 285, 95 265, 88 245
               C 78 225, 65 210, 55 195
               C 50 180, 68 168, 85 160
               C 102 152, 115 138, 118 120
               C 120 102, 110 85, 118 65
               C 122 48, 128 32, 135 25 Z"
            fill="url(#indiaFillGrad)"
            stroke="url(#indiaBorderGrad)"
            strokeWidth="2"
            strokeLinejoin="round"
            filter="url(#mapGlow)"
            className="fl-india-outline"
          />

          {/* Kashmir Crown Region Accents */}
          <path
            d="M 135 25 C 145 15, 160 12, 170 25 C 160 38, 142 42, 135 25 Z"
            fill="rgba(56, 189, 248, 0.15)"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="1.2"
          />

          {/* Dynamic Inter-City Signal Beams */}
          <g stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" strokeDasharray="3 3" className="fl-radar-beams">
            {citiesData.map((c) => {
              if (c.id === 'ludhiana') return null;
              return (
                <line
                  key={`beam-${c.id}`}
                  x1="148"
                  y1="112"
                  x2={c.x}
                  y2={c.y}
                  className="fl-signal-line"
                />
              );
            })}
          </g>

          {/* City Markers & Glowing Pulsing Rings */}
          {citiesData.map((city) => {
            const isSelected = activeCity.id === city.id;
            return (
              <g
                key={city.id}
                className={`fl-city-pin ${isSelected ? 'is-selected' : ''} ${city.isHQ ? 'is-hq-pin' : ''}`}
                onClick={() => setActiveCity(city)}
                style={{ cursor: 'pointer' }}
              >
                {/* Ping wave 1 */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={city.isHQ ? 16 : 10}
                  className="fl-ping-circle"
                  fill="none"
                  stroke={city.isHQ ? '#38bdf8' : '#22c55e'}
                  strokeWidth="1.5"
                />

                {/* Ping wave 2 for HQ */}
                {city.isHQ && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="24"
                    className="fl-ping-circle-delayed"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                )}

                {/* Core Glow Dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isSelected ? 6 : city.isHQ ? 5 : 4}
                  fill={isSelected ? '#ffffff' : city.isHQ ? '#38bdf8' : '#22c55e'}
                  stroke={city.isHQ ? '#062016' : '#030812'}
                  strokeWidth="2"
                  filter="url(#mapGlow)"
                />

                {/* City Label Badge on SVG */}
                <g transform={`translate(${city.x + (city.x > 200 ? -75 : 12)}, ${city.y - 6})`}>
                  <rect
                    width="70"
                    height="18"
                    rx="4"
                    fill="rgba(8, 18, 36, 0.88)"
                    stroke={isSelected ? 'rgba(56, 189, 248, 0.8)' : 'rgba(148, 163, 184, 0.25)'}
                    strokeWidth={isSelected ? '1.2' : '0.8'}
                  />
                  <text
                    x="6"
                    y="12"
                    fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                    fontSize="9"
                    fontWeight={isSelected || city.isHQ ? '700' : '500'}
                    fontFamily="var(--font-sans)"
                  >
                    {city.name} {city.isHQ ? '★' : ''}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Floating Active City HUD Callout Card */}
        <div className="fl-map-hud-card">
          <div className="fl-hud-header">
            <span className="fl-live-radar-dot" />
            <div>
              <strong>{activeCity.name}</strong>
              <small>{activeCity.region}</small>
            </div>
            {activeCity.isHQ && <span className="fl-hq-tag">Operations Hub</span>}
          </div>
          <div className="fl-hud-metrics">
            <div>
              <span>Retailers Active</span>
              <strong>{activeCity.retailers}+ Shops</strong>
            </div>
            <div>
              <span>Live Handsets</span>
              <strong style={{ color: '#38bdf8' }}>{activeCity.devices}</strong>
            </div>
            <div>
              <span>MDM Ping Speed</span>
              <strong style={{ color: '#22c55e' }}>&lt; 2.1s</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

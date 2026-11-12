import { useEffect, useRef, useState } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoInterpolate, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';

interface HubPoint {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  devices: string;
  retailers: number;
  ping: string;
  isHQ?: boolean;
}

const hubsData: HubPoint[] = [
  { id: 'ludhiana', name: 'Ludhiana', region: 'Punjab (Master HQ)', lat: 30.9, lon: 75.85, devices: '580+ active', retailers: 72, ping: '< 1.8s', isHQ: true },
  { id: 'delhi', name: 'Delhi NCR', region: 'North Hub', lat: 28.61, lon: 77.2, devices: '840+ active', retailers: 95, ping: '< 2.1s' },
  { id: 'mumbai', name: 'Mumbai', region: 'West Hub', lat: 19.07, lon: 72.87, devices: '720+ active', retailers: 84, ping: '< 2.0s' },
  { id: 'bengaluru', name: 'Bengaluru', region: 'South Hub', lat: 12.97, lon: 77.59, devices: '510+ active', retailers: 62, ping: '< 2.3s' },
  { id: 'dubai', name: 'Dubai', region: 'Middle East Gateway', lat: 25.2, lon: 55.27, devices: '320+ active', retailers: 28, ping: '< 2.9s' },
  { id: 'singapore', name: 'Singapore', region: 'APAC Cloud Relay', lat: 1.35, lon: 103.81, devices: '410+ active', retailers: 36, ping: '< 2.7s' },
  { id: 'london', name: 'London', region: 'Europe Gateway', lat: 51.5, lon: -0.12, devices: '190+ active', retailers: 18, ping: '< 3.2s' }
];

// Extract real GeoJSON features from official world atlas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const worldAtlas = worldData as any;
const landGeo = feature(worldAtlas, worldAtlas.objects.land);
const countriesGeo = feature(worldAtlas, worldAtlas.objects.countries);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const indiaGeo = (countriesGeo as any).features.find((f: any) => f.id === '356' || f.id === 356);
const graticuleGeo = geoGraticule()();

export default function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeHub, setActiveHub] = useState<HubPoint>(hubsData[0]);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initial rotation centered on India: [ -lon, -lat ]
  const rotation = useRef<[number, number, number]>([-77.5, -22, 0]);
  const targetRotation = useRef<[number, number, number]>([-77.5, -22, 0]);

  const focusHub = (hub: HubPoint) => {
    setActiveHub(hub);
    targetRotation.current = [-hub.lon, -hub.lat + 5, 0];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let pulseStep = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.min(rect.width || 460, rect.height || 460);

      if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.38;

      // Smooth rotation step
      if (!isDragging) {
        targetRotation.current[0] -= 0.22; // smooth auto-spin eastward
      }
      rotation.current[0] += (targetRotation.current[0] - rotation.current[0]) * 0.08;
      rotation.current[1] += (targetRotation.current[1] - rotation.current[1]) * 0.08;
      pulseStep += 0.04;

      // Configure D3 Orthographic 3D Projection
      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate(rotation.current)
        .clipAngle(90);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pathGenerator = geoPath(projection, ctx as any);

      // 1. Atmosphere Ambient Glow Aura
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.32);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.1)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.32, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Ocean Sphere
      const oceanGrad = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
      oceanGrad.addColorStop(0, '#0d284d');
      oceanGrad.addColorStop(0.65, '#06152a');
      oceanGrad.addColorStop(1, '#020712');

      ctx.beginPath();
      pathGenerator({ type: 'Sphere' });
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // 3. Graticule Latitude/Longitude Grid
      ctx.beginPath();
      pathGenerator(graticuleGeo);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.09)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 4. Real World Continents Map Outline & Solid Shading
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathGenerator(landGeo as any);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.22)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // 5. Special Highlight for India
      if (indiaGeo) {
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pathGenerator(indiaGeo as any);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // 6. 3D Spherical Rim Light & Shading
      ctx.beginPath();
      pathGenerator({ type: 'Sphere' });
      const rimGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      rimGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      rimGrad.addColorStop(0.5, 'rgba(96, 165, 250, 0.3)');
      rimGrad.addColorStop(1, 'rgba(34, 197, 94, 0.85)');
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 7. Curved Radar Arcs from Ludhiana HQ to Global Hubs
      const hq = hubsData[0];
      const globeCenter: [number, number] = [-rotation.current[0], -rotation.current[1]];
      const hqDist = geoDistance([hq.lon, hq.lat], globeCenter);
      const isHqVisible = hqDist < 1.48;
      const hqPos = isHqVisible ? projection([hq.lon, hq.lat]) : null;

      hubsData.slice(1).forEach((hub) => {
        const hubDist = geoDistance([hub.lon, hub.lat], globeCenter);
        const isHubVisible = hubDist < 1.48;

        if (isHqVisible && isHubVisible && hqPos) {
          const hubPos = projection([hub.lon, hub.lat]);
          if (hubPos) {
            const interpolator = geoInterpolate([hq.lon, hq.lat], [hub.lon, hub.lat]);
            const midGeo = interpolator(0.5);
            const midPos = projection(midGeo);

            if (midPos) {
              ctx.beginPath();
              ctx.moveTo(hqPos[0], hqPos[1]);
              ctx.quadraticCurveTo(midPos[0], midPos[1] - radius * 0.18, hubPos[0], hubPos[1]);
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
              ctx.setLineDash([4, 4]);
              ctx.lineWidth = 1.3;
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      });

      // 8. Hub Location Hotspot Pins & Badges (Visible ONLY on front-facing hemisphere)
      hubsData.forEach((hub) => {
        const dist = geoDistance([hub.lon, hub.lat], globeCenter);
        // Only render if on the front-facing hemisphere (distance < 1.45 rad, approx < 83 degrees)
        if (dist >= 1.45) return;

        const pos = projection([hub.lon, hub.lat]);
        if (pos) {
          const isSelected = activeHub.id === hub.id;
          const [px, py] = pos;

          // Smooth edge fade out
          const edgeFade = Math.max(0.1, Math.min(1, (1.45 - dist) / 0.35));

          // Animated Radar Ping Wave
          const waveR = ((pulseStep * 18 + (hub.isHQ ? 0 : 7)) % 22) + 3;
          const waveAlpha = Math.max(0, 1 - waveR / 24) * edgeFade;

          ctx.beginPath();
          ctx.arc(px, py, waveR, 0, Math.PI * 2);
          ctx.strokeStyle = hub.isHQ
            ? `rgba(56, 189, 248, ${waveAlpha})`
            : `rgba(34, 197, 94, ${waveAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Hub Core Dot
          ctx.beginPath();
          ctx.arc(px, py, isSelected ? 6.5 : hub.isHQ ? 5.5 : 4, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#ffffff' : hub.isHQ ? '#38bdf8' : '#22c55e';
          ctx.globalAlpha = edgeFade;
          ctx.fill();
          ctx.strokeStyle = '#020610';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Location Badge Label (Only show when clearly in front, not on steep horizon)
          if (dist < 1.25) {
            ctx.font = `700 ${isSelected ? 11 : 10}px 'Inter', sans-serif`;
            const labelText = `${hub.name}${hub.isHQ ? ' ★ HQ' : ''}`;
            const textMetrics = ctx.measureText(labelText);
            const badgeW = textMetrics.width + 14;
            const badgeH = 20;

            const badgeX = px + 8;
            const badgeY = py - 10;

            ctx.globalAlpha = edgeFade;
            ctx.fillStyle = isSelected ? 'rgba(14, 30, 58, 0.94)' : 'rgba(6, 14, 28, 0.88)';
            ctx.strokeStyle = isSelected ? 'rgba(56, 189, 248, 0.95)' : 'rgba(148, 163, 184, 0.35)';
            ctx.lineWidth = isSelected ? 1.4 : 0.8;
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 5);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#38bdf8' : '#f1f5f9';
            ctx.fillText(labelText, badgeX + 7, badgeY + 14);
            ctx.globalAlpha = 1;
          }
        }
      });

      ctx.restore();
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isDragging, activeHub]);

  // Drag handlers for free 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    targetRotation.current[0] += dx * 0.45;
    targetRotation.current[1] = Math.max(-65, Math.min(65, targetRotation.current[1] - dy * 0.45));
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fl-map-container fl-globe-container">
      {/* Hub list selector */}
      <div className="fl-map-city-list">
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9db8e5', fontWeight: 800 }}>
            Live MDM Network Hubs
          </span>
        </div>
        {hubsData.map((hub) => (
          <button
            key={hub.id}
            className={`fl-map-city-btn ${activeHub.id === hub.id ? 'active' : ''} ${hub.isHQ ? 'is-hq' : ''}`}
            onClick={() => focusHub(hub)}
            onMouseEnter={() => focusHub(hub)}
          >
            <div className="fl-city-meta">
              <span className="fl-city-dot" />
              <strong>{hub.name}</strong>
              {hub.isHQ && <span className="fl-hq-badge">HQ</span>}
            </div>
            <span className="fl-city-stat">{hub.devices}</span>
          </button>
        ))}
      </div>

      {/* Right Pane: 3D World Globe + Dedicated Glass HUD Bar */}
      <div className="fl-globe-right-pane">
        <div
          className="fl-map-canvas-wrapper fl-globe-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <canvas ref={canvasRef} className="fl-globe-canvas" />

          <div className="fl-globe-hint">
            <span>🔄 Drag globe to rotate in 3D</span>
          </div>
        </div>

        {/* Active Hub HUD Details Card (Cleanly placed, no overlap) */}
        <div className="fl-map-hud-card">
          <div className="fl-hud-header">
            <span className="fl-live-radar-dot" />
            <div>
              <strong>{activeHub.name}</strong>
              <small>{activeHub.region}</small>
            </div>
            {activeHub.isHQ && <span className="fl-hq-tag">Master Operations HQ</span>}
          </div>
          <div className="fl-hud-metrics">
            <div>
              <span>Active Retailers</span>
              <strong>{activeHub.retailers}+ Outlets</strong>
            </div>
            <div>
              <span>Live Handsets</span>
              <strong style={{ color: '#38bdf8' }}>{activeHub.devices}</strong>
            </div>
            <div>
              <span>Lock Command Ping</span>
              <strong style={{ color: '#22c55e' }}>{activeHub.ping}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  ["CONNECTION", "SITL ACTIVE"],
  ["ALTITUDE", "120 m"],
  ["GROUND SPEED", "22.4 m/s"],
  ["FLIGHT MODE", "AUTO"],
  ["LINK", "STABLE"],
];

export function TelemetryPanel() {
  return (
    <div className="telemetry-panel">
      <div className="telemetry-head"><span><i />SIMULATION DATA</span><span>ARES-01 / LIVE MOCK</span></div>
      <div className="telemetry-grid">
        {values.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
      </div>
      <div className="telemetry-trace" aria-hidden="true"><svg viewBox="0 0 800 72" preserveAspectRatio="none"><path d="M0 44 C42 40 52 48 91 42 S144 29 182 36 240 57 285 42 335 20 386 34 442 52 487 39 548 26 595 37 650 52 700 33 752 40 800 29" /></svg></div>
    </div>
  );
}

import { ArrowRight } from "lucide-react";

const nodes = ["AIRCRAFT GPS", "MAVLINK", "ARES-01", "TRACKER CONTROL", "PAN / TILT"];
export function TrackerDiagram() {
  return (
    <div className="tracker-layout">
      <div className="tracker-flow">
        {nodes.map((node, i) => <div className="tracker-flow-item" key={node}><span>{String(i + 1).padStart(2, "0")}</span><b>{node}</b>{i < nodes.length - 1 && <ArrowRight aria-hidden="true" />}</div>)}
      </div>
      <div className="tracker-sim">
        <div className="tracker-radar" aria-hidden="true"><i /><i /><i /><span /></div>
        <div className="tracker-readings">
          <p><span><i />SIMULATED TRACKER DATA</span><b>TRACKER STATE · SIMULATION</b></p>
          <dl><div><dt>TARGET BEARING</dt><dd>127.4°</dd></div><div><dt>TARGET ELEVATION</dt><dd>16.8°</dd></div><div><dt>POSITION ERROR</dt><dd>0.5°</dd></div><div><dt>GPS AGE</dt><dd>0.2 s</dd></div></dl>
        </div>
      </div>
    </div>
  );
}

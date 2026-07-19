"use client";

import { useState } from "react";
import { ArrowRight, Radio } from "lucide-react";
import { systemModules } from "@/content/project";
import { StatusLabel } from "./StatusLabel";

export function SystemExplorer() {
  const [active, setActive] = useState(1);
  const activeModule = systemModules[active];
  return (
    <div className="system-explorer">
      <div className="signal-flow" aria-label="System signal flow">
        {systemModules.map((item, index) => (
          <div className="flow-node-wrap" key={item.id}>
            <button className={`flow-node ${active === index ? "active" : ""}`} onClick={() => setActive(index)} aria-pressed={active === index}>
              <span>{item.index}</span><b>{item.shortName}</b><small>{item.status}</small>
            </button>
            {index < systemModules.length - 1 && <div className="flow-line" aria-hidden="true"><i /><ArrowRight size={14} /></div>}
          </div>
        ))}
        <div className="analysis-node"><Radio size={18} /><span>MISSION<br />ANALYSIS</span></div>
      </div>
      <div className="system-detail" aria-live="polite">
        <div className="system-detail-id"><span>MODULE / {activeModule.index}</span><i /></div>
        <div>
          <StatusLabel status={activeModule.status} />
          <h3>{activeModule.name}</h3>
          <p>{activeModule.purpose}</p>
        </div>
        <dl>
          <div><dt>PRIMARY FUNCTIONS</dt><dd>{activeModule.functions.map((item) => <span key={item}>{item}</span>)}</dd></div>
          <div><dt>CURRENT STAGE</dt><dd>{activeModule.stage}</dd></div>
        </dl>
      </div>
    </div>
  );
}

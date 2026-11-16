import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface ModelRiskDisclaimerProps {
  risks: string[];
}

export const ModelRiskDisclaimer: React.FC<ModelRiskDisclaimerProps> = ({ risks }) => {
  return (
    <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5 text-xs text-amber-900 space-y-2">
      <div className="flex items-center gap-2 font-bold text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>Model Risk Considerations & Key Uncertainties</span>
      </div>
      <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
        {risks.map((risk, idx) => (
          <li key={idx} className="leading-relaxed">
            {risk}
          </li>
        ))}
      </ul>
      <div className="pt-2 text-[10px] text-amber-700/80 flex items-center gap-1">
        <Info className="w-3 h-3" />
        <span>
          AI predictions are quantitative estimates and do not constitute formal investment advice.
        </span>
      </div>
    </div>
  );
};

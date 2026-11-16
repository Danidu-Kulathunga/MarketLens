import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AIMarketBriefCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-xl p-5 text-white shadow-md relative overflow-hidden space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <h3 className="font-bold text-sm text-indigo-200">Daily Market Intelligence Brief</h3>
      </div>
      <p className="text-xs text-indigo-100/90 leading-relaxed">
        Equities are trending positive into the morning session driven by semiconductor strength
        and moderating inflation telemetry. Large-cap tech outperforming small-caps.
      </p>
      <div className="pt-2 flex items-center justify-between text-[11px] text-indigo-300">
        <span>Grounded Thesis Available</span>
        <button
          onClick={() => navigate('/ai-analyst')}
          className="hover:text-white font-semibold underline"
        >
          Open AI Analyst →
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { INITIAL_PIPELINE_TASKS } from '@/data/mock/dataManagerData';

export const PipelineProcessingTasks: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Active Ingestion Pipelines</h3>
          <p className="text-xs text-gray-400">Background workers and ETL transformation telemetry</p>
        </div>
        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          Workers Active: 3
        </span>
      </div>

      <div className="space-y-4">
        {INITIAL_PIPELINE_TASKS.map((task) => (
          <div key={task.id} className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {task.status === 'Processing' ? (
                  <RotateCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span className="font-bold text-gray-900">{task.name}</span>
              </div>
              <span className="text-gray-400 font-mono text-[11px]">
                {task.status === 'Processing' ? `ETA: ${task.eta}` : `Completed: ${task.lastCompleted}`}
              </span>
            </div>

            {task.progress !== undefined && (
              <div className="space-y-1">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>{task.detail}</span>
                  <span>{task.progress}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

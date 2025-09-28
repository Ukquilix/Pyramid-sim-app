
import React from 'react';
import { LogEntry } from '../types';
import Card from './ui/Card';
import { ScrollTextIcon } from './ui/icons';

interface Props {
  log: LogEntry[];
}

const LogItem: React.FC<{ entry: LogEntry }> = ({ entry }) => {
  const baseClasses = "text-sm font-mono py-1";
  const colorClasses = {
    info: "text-stone-600",
    success: "text-emerald-600 font-bold",
    error: "text-red-600 font-bold",
  };
  return <p className={`${baseClasses} ${colorClasses[entry.type]}`}>{entry.message}</p>;
};


const SimulationLog: React.FC<Props> = ({ log }) => {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <ScrollTextIcon className="h-6 w-6 text-amber-700"/>
        <h2 className="text-2xl font-bold font-display text-stone-800">Overseer's Log</h2>
      </div>
      <div className="h-64 bg-amber-50 rounded-lg p-3 overflow-y-auto font-mono text-sm border border-amber-200">
        {log.length > 0 ? (
          log.map((entry, index) => <LogItem key={index} entry={entry} />)
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-stone-500 italic">Awaiting orders to begin...</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SimulationLog;

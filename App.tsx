
import React, { useState, useCallback } from 'react';
import { SimulationParams, LiftResult, LogEntry } from './types';
import { computeLift } from './services/simulationService';
import SimulationControlPanel from './components/SimulationControlPanel';
import RampVisualizer from './components/RampVisualizer';
import SimulationLog from './components/SimulationLog';
import ArchitectAI from './components/ArchitectAI';
import { DjedIcon } from './components/ui/icons';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    stoneMasses: [50000, 60000, 55000],
    gravity: 9.81,
    rampLength: 100,
    rampAngle: 12,
    crossbars: 7,
    ankhMultiplier: 2,
    numGang1: 10,
    numGang2: 10,
    numRetractor: 1,
    personPull: 500,
    ropeStrength: 100000,
  });

  const [simulationResults, setSimulationResults] = useState<LiftResult[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStoneIndex, setActiveStoneIndex] = useState<number | null>(null);

  const runSimulation = useCallback(() => {
    setIsSimulating(true);
    setLog([]);
    setSimulationResults([]);
    setActiveStoneIndex(null);

    const results: LiftResult[] = [];
    const newLog: LogEntry[] = [];
    
    let delay = 0;

    params.stoneMasses.forEach((stoneMass, i) => {
      setTimeout(() => {
        setActiveStoneIndex(i);
        const res = computeLift(stoneMass, params);
        results.push(res);
        
        newLog.push({ type: 'info', message: `--- SIMULATING STONE ${i + 1} (Mass: ${stoneMass.toLocaleString()} kg) ---` });
        newLog.push({ type: 'info', message: `Required Force to Overcome Resistance: ${res.resistiveForce.toFixed(0)} N` });
        newLog.push({ type: 'info', message: `Your Crew's Total Applied Force: ${res.totalForce.toFixed(0)} N` });
        newLog.push({ type: 'info', message: `Rope Integrity Check: ${res.ropeOk ? 'PASS' : 'FAIL'}` });

        if (res.stoneLifted) {
          newLog.push({ type: 'success', message: "THE STONE RISES! A MONUMENT TO OUR GLORY WILL TOUCH THE SKY!" });
        } else {
          newLog.push({ type: 'error', message: "FAIL! THE STONE MOCKS YOUR WEAKNESS! MORE EFFORT, SLACKERS!" });
        }
        newLog.push({ type: 'info', message: `` });

        setSimulationResults([...results]);
        setLog([...newLog]);
        
        if (i === params.stoneMasses.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setActiveStoneIndex(null);
          }, res.stoneLifted ? 2000 : 500);
        }

      }, delay);
      delay += 2500;
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-amber-100/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <DjedIcon className="h-12 w-12 text-amber-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 font-display tracking-wider">
              Pyramid Construction Simulator
            </h1>
          </div>
          <p className="mt-2 text-lg text-stone-600">
            Harnessing the Djed, Ankh, and Tyet to raise a monument for the ages.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SimulationControlPanel
              params={params}
              setParams={setParams}
              onRunSimulation={runSimulation}
              isSimulating={isSimulating}
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <RampVisualizer 
              params={params} 
              isSimulating={isSimulating}
              activeStoneIndex={activeStoneIndex}
              liftResult={activeStoneIndex !== null ? simulationResults[activeStoneIndex] : undefined}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SimulationLog log={log} />
              <ArchitectAI params={params} results={simulationResults} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

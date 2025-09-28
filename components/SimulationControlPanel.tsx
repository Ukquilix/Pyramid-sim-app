import React from 'react';
import { SimulationParams } from '../types';
import Card from './ui/Card';
import Slider from './ui/Slider';
import Button from './ui/Button';
// FIX: Added DjedIcon to the import statement to resolve "Cannot find name 'DjedIcon'" error.
import { PlayIcon, CogIcon, UsersIcon, DjedIcon } from './ui/icons';

interface Props {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  onRunSimulation: () => void;
  isSimulating: boolean;
}

const SimulationControlPanel: React.FC<Props> = ({ params, setParams, onRunSimulation, isSimulating }) => {
  const handleParamChange = <K extends keyof SimulationParams,>(
    param: K,
    value: SimulationParams[K]
  ) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <CogIcon className="h-6 w-6 text-amber-700"/>
        <h2 className="text-2xl font-bold font-display text-stone-800">Construction Parameters</h2>
      </div>
      <div className="space-y-5">
        <Slider
          label="Ramp Angle (°)"
          min={5}
          max={20}
          step={1}
          value={params.rampAngle}
          onChange={e => handleParamChange('rampAngle', +e.target.value)}
          disabled={isSimulating}
        />
        <Slider
          label="Pull Force per Person (N)"
          min={250}
          max={750}
          step={25}
          value={params.personPull}
          onChange={e => handleParamChange('personPull', +e.target.value)}
          disabled={isSimulating}
        />
        
        <div className="pt-2">
            <div className="flex items-center gap-3 mb-2">
                <UsersIcon className="h-6 w-6 text-amber-700"/>
                <h3 className="text-xl font-bold font-display text-stone-700">Workforce</h3>
            </div>
             <Slider
              label="Main Pulling Gangs"
              min={5}
              max={50}
              step={1}
              value={params.numGang1}
              onChange={e => {
                const val = +e.target.value;
                setParams(prev => ({ ...prev, numGang1: val, numGang2: val }));
              }}
              disabled={isSimulating}
              displayValue={`${params.numGang1} x 2`}
            />
            <Slider
              label="Retractor Crew"
              min={1}
              max={10}
              step={1}
              value={params.numRetractor}
              onChange={e => handleParamChange('numRetractor', +e.target.value)}
              disabled={isSimulating}
            />
        </div>

        <div className="pt-2">
            <div className="flex items-center gap-3 mb-2">
                <DjedIcon className="h-6 w-6 text-amber-700"/>
                <h3 className="text-xl font-bold font-display text-stone-700">Djed System</h3>
            </div>
             <Slider
              label="Crossbars"
              min={1}
              max={10}
              step={1}
              value={params.crossbars}
              onChange={e => handleParamChange('crossbars', +e.target.value)}
              disabled={isSimulating}
            />
            <Slider
              label="Ankh Multiplier"
              min={1}
              max={4}
              step={0.5}
              value={params.ankhMultiplier}
              onChange={e => handleParamChange('ankhMultiplier', +e.target.value)}
              disabled={isSimulating}
            />
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={onRunSimulation} disabled={isSimulating} className="w-full">
          <PlayIcon className="h-5 w-5 mr-2"/>
          {isSimulating ? 'Simulation in Progress...' : 'Begin Hauling'}
        </Button>
      </div>
    </Card>
  );
};

export default SimulationControlPanel;
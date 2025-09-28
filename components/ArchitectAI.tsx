
import React, { useState } from 'react';
import { SimulationParams, LiftResult } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { getArchitectsAnalysis } from '../services/geminiService';
import { BrainCircuitIcon } from './ui/icons';

interface Props {
  params: SimulationParams;
  results: LiftResult[];
}

const ArchitectAI: React.FC<Props> = ({ params, results }) => {
  const [question, setQuestion] = useState("Why did my last attempt fail and what should I change?");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    setIsLoading(true);
    setAnalysis("");
    try {
      const response = await getArchitectsAnalysis(params, results, question);
      setAnalysis(response);
    } catch (error) {
      setAnalysis("An error occurred while consulting the architect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuitIcon className="h-6 w-6 text-amber-700" />
        <h2 className="text-2xl font-bold font-display text-stone-800">Ask the Architect</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-stone-700 mb-1">
            Your Query for Imhotep:
          </label>
          <textarea
            id="question"
            rows={3}
            className="w-full p-2 border border-amber-300 rounded-md bg-white shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Is my ramp too steep?"
          />
        </div>
        <Button onClick={handleAsk} disabled={isLoading} className="w-full">
          {isLoading ? "Consulting..." : "Seek Counsel"}
        </Button>
      </div>
      {analysis && (
        <div className="mt-4 pt-4 border-t border-amber-200">
           <h3 className="text-lg font-bold font-display text-stone-700 mb-2">Imhotep's Wisdom:</h3>
           <div className="prose prose-sm prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
        </div>
      )}
       {isLoading && (
        <div className="mt-4 pt-4 border-t border-amber-200 text-center">
            <p className="text-stone-500 animate-pulse">The architect is contemplating your query...</p>
        </div>
      )}
    </Card>
  );
};

export default ArchitectAI;

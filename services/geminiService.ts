
import { GoogleGenAI } from "@google/genai";
import { SimulationParams, LiftResult } from '../types';

export const getArchitectsAnalysis = async (
  params: SimulationParams,
  results: LiftResult[],
  question: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const summary = results.map((r, i) => 
    `Stone ${i + 1}: Applied Force=${r.totalForce.toFixed(0)}N, Required Force=${r.resistiveForce.toFixed(0)}N, Success=${r.stoneLifted}`
  ).join('; ');

  const prompt = `
    You are Imhotep, the wise and stern architect of the great pyramids. The Overseer (the user) has run a simulation of lifting stones and needs your counsel.
    
    Current Simulation Parameters:
    - Ramp Angle: ${params.rampAngle} degrees
    - Crew Size: ${params.numGang1 + params.numGang2} pullers, ${params.numRetractor} retractors.
    - Pulling Force per person: ${params.personPull} N
    - Djed System Multipliers: ${params.crossbars} crossbars, ${params.ankhMultiplier}x Ankh multiplier.
    
    Simulation Results Summary: ${summary || 'No simulation run yet.'}
    
    The Overseer's question is: "${question}"
    
    Based on the parameters, results, and the question, provide a concise, insightful answer in character as Imhotep. 
    Explain the physics simply. If the lift failed, give practical advice on what to change (e.g., 'Your ramp is too steep,' or 'You need more hands on the ropes.'). If it succeeded, offer praise but caution against complacency.
    Keep your response to a few paragraphs. Format your response with markdown for readability.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "The architect is deep in thought and cannot be disturbed. Please check your configuration and try again later.";
  }
};

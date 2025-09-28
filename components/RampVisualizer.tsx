
import React, { useState, useEffect } from 'react';
import { SimulationParams, LiftResult } from '../types';
import Card from './ui/Card';

interface Props {
  params: SimulationParams;
  isSimulating: boolean;
  activeStoneIndex: number | null;
  liftResult?: LiftResult;
}

const RampVisualizer: React.FC<Props> = ({ params, activeStoneIndex, liftResult }) => {
  const [progress, setProgress] = useState(0);

  const viewBoxWidth = 120;
  const viewBoxHeight = 60;
  
  const rampAngleRad = params.rampAngle * Math.PI / 180;
  const rampBase = 100;
  const rampHeight = rampBase * Math.tan(rampAngleRad);
  
  const scaleX = viewBoxWidth / (rampBase * 1.1);
  const scaleY = viewBoxHeight / (rampHeight * 2.5);
  const scale = Math.min(scaleX, scaleY);

  const scaledRampBase = rampBase * scale;
  const scaledRampHeight = rampHeight * scale;
  const rampStartX = (viewBoxWidth - scaledRampBase) / 2;
  const rampStartY = viewBoxHeight - 5;
  
  const stoneWidth = 10;
  const stoneHeight = 6;
  
  const stoneX = rampStartX + progress * scaledRampBase - (progress * stoneWidth / 2) - stoneWidth / 2;
  const stoneY = rampStartY - progress * scaledRampHeight - stoneHeight;

  useEffect(() => {
    let animationFrameId: number;
    
    if (liftResult?.stoneLifted) {
      let start: number | null = null;
      const duration = 1800;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);
        if (newProgress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setProgress(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [liftResult]);

  const forceRatio = liftResult ? Math.min(liftResult.totalForce / liftResult.resistiveForce, 1.5) : 0;
  const forceVectorLength = 20 * forceRatio;

  return (
    <Card>
      <h2 className="text-2xl font-bold font-display text-stone-800 mb-4 text-center">
          {activeStoneIndex !== null ? `Hauling Stone ${activeStoneIndex + 1}` : "Awaiting Command"}
      </h2>
      <div className="aspect-video bg-sky-100 rounded-lg p-2 overflow-hidden border border-amber-200 relative">
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} width="100%" height="100%">
          {/* Sun */}
          <circle cx={viewBoxWidth - 15} cy="15" r="8" fill="gold" opacity="0.8" />

          {/* Ramp */}
          <polygon 
            points={`${rampStartX},${rampStartY} ${rampStartX + scaledRampBase},${rampStartY} ${rampStartX + scaledRampBase},${rampStartY - scaledRampHeight}`} 
            fill="#e4c590" 
          />
          <line 
            x1={rampStartX} y1={rampStartY} 
            x2={rampStartX + scaledRampBase} y2={rampStartY - scaledRampHeight} 
            stroke="#b49360" strokeWidth="1"
          />

          {/* Stone */}
          <g transform={`translate(${stoneX}, ${stoneY}) rotate(${-params.rampAngle}, ${stoneWidth/2}, ${stoneHeight})`}>
            <rect 
              width={stoneWidth} 
              height={stoneHeight} 
              fill="#a8a29e" 
              stroke="#78716c" 
              strokeWidth="0.5"
              className={`transition-transform duration-300 ${liftResult && !liftResult.stoneLifted ? 'animate-shake' : ''}`}
              style={{ transformOrigin: 'center' }}
            />
          </g>
          
          {/* Force Vectors */}
          {liftResult && progress > 0.05 && progress < 0.95 && (
             <g>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>
               <line
                 x1={stoneX + stoneWidth/2}
                 y1={stoneY + stoneHeight/2}
                 x2={stoneX + stoneWidth/2 + forceVectorLength * Math.cos(-rampAngleRad)}
                 y2={stoneY + stoneHeight/2 + forceVectorLength * Math.sin(-rampAngleRad)}
                 stroke="#3b82f6"
                 strokeWidth="1.5"
                 markerEnd="url(#arrowhead)"
               />
             </g>
          )}

           {/* Djed Pivot */}
          <circle cx={rampStartX + scaledRampBase} cy={rampStartY - scaledRampHeight} r="2" fill="#ef4444" />
          <text x={rampStartX + scaledRampBase} y={rampStartY - scaledRampHeight - 4} textAnchor="middle" fontSize="4" fill="#ef4444" className="font-display font-bold">DJED</text>
        </svg>
        {liftResult && activeStoneIndex !== null && (
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs rounded p-2 font-mono">
            <p>Force Applied: {liftResult.totalForce.toFixed(0)} N</p>
            <p>Force Needed: {liftResult.resistiveForce.toFixed(0)} N</p>
            <p>Status: <span className={liftResult.stoneLifted ? 'text-green-400' : 'text-red-400'}>{liftResult.stoneLifted ? 'SUCCESS' : 'FAILURE'}</span></p>
          </div>
        )}
      </div>
       <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
      `}</style>
    </Card>
  );
};

export default RampVisualizer;

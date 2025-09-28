
import { SimulationParams, LiftResult } from '../types';

export const computeLift = (stoneMass: number, params: SimulationParams): LiftResult => {
  const {
    gravity,
    rampAngle,
    crossbars,
    ankhMultiplier,
    numGang1,
    numGang2,
    numRetractor,
    personPull,
    ropeStrength,
  } = params;

  const W = stoneMass * gravity;
  const theta = rampAngle * Math.PI / 180;
  const gravityComponent = W * Math.sin(theta);
  const normalForce = W * Math.cos(theta);
  const frictionForce = 0.2 * normalForce; // Coefficient of friction from R code
  const resistiveForce = gravityComponent + frictionForce;

  const T_gang1 = numGang1 * personPull;
  const T_gang2 = numGang2 * personPull;
  const R_retractor = numRetractor * personPull;

  const totalForce = (T_gang1 + T_gang2 + R_retractor) * crossbars * ankhMultiplier;
  const ropeOk = T_gang1 <= ropeStrength && T_gang2 <= ropeStrength && R_retractor <= ropeStrength;
  const stoneLifted = totalForce >= resistiveForce && ropeOk;

  return { W, resistiveForce, totalForce, ropeOk, stoneLifted };
};


export interface SimulationParams {
  stoneMasses: number[];
  gravity: number;
  rampLength: number;
  rampAngle: number;
  crossbars: number;
  ankhMultiplier: number;
  numGang1: number;
  numGang2: number;
  numRetractor: number;
  personPull: number;
  ropeStrength: number;
}

export interface LiftResult {
  W: number;
  resistiveForce: number;
  totalForce: number;
  ropeOk: boolean;
  stoneLifted: boolean;
}

export interface LogEntry {
  type: 'info' | 'success' | 'error';
  message: string;
}

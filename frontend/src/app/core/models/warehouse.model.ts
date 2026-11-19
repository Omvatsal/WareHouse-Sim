export type Position = [number, number];
export type Terrain = 'normal' | 'crowded' | 'shelf' | 'restricted';
export type AlgorithmType = 'bfs' | 'dfs' | 'greedy' | 'astar';

export interface WarehouseCell {
  position: Position;
  terrain: Terrain;
}

export interface HeuristicMetadata {
  name: string;
  explanation: string;
}

export interface WarehouseScenario {
  rows: number;
  cols: number;
  start: Position;
  goal: Position;
  trolley: Position;
  cells: WarehouseCell[];
  costs: Record<string, number>;
  heuristic: HeuristicMetadata;
}

export interface CandidateScore {
  cell: Position;
  g: number;
  h: number;
  f?: number | null;
}

export interface TraceEvent {
  step: number;
  current: Position;
  frontier: Position[];
  considered: Position[];
  scores?: CandidateScore[];
}

export interface SearchResult {
  algorithm: string;
  reached: boolean;
  path: Position[];
  moves: number;
  totalCost: number;
  nodesExpanded: number;
  elapsedMs: number;
  trace: TraceEvent[];
  replans?: number;
  trolley?: Position;
  detectedAt?: Position;
}

export interface TrolleyExperimentResult {
  original: SearchResult;
  travelled: Position[];
  detectedAt: Position;
  trolley: Position;
  revised: SearchResult;
  combinedPath: Position[];
  goalReached: boolean;
  replans: number;
  moves: number;
  totalCost: number;
  nodesExpanded: number;
  distanceToBlockedCell: number;
}

export interface FeedEventItem {
  index: number;
  current: Position;
  detail: string;
  scores?: CandidateScore;
}

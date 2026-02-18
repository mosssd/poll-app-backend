export interface PollData {
  [key: string]: number;
}

export interface ServerToClientEvents {
  update_results: (data: PollData) => void;
}

export interface ClientToServerEvents {
  vote_cast: (framework: string) => void;
}
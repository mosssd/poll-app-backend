export interface PollData {
  [key: string]: number;
}

export interface ServerToClientEvents {
  update_results: (data: PollData) => void;
}

export interface ClientToServerEvents {
  vote_cast: (choice: string) => void;
  add_option: (options: string) => void;
  clear_poll: () => void;
}
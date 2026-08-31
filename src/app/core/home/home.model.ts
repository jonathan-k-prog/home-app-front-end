export interface Home {
  id: number;
  name: string;
  identifier: string;
  timestamp: number;
}

export interface HomeRequest {
  name: string;
  identifier: string;
  timestamp: number;
}

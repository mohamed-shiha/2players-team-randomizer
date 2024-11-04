export interface Player {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  players: Player[];
}

export interface Team {
  id: string;
  name?: string;
  players: [Player, Player];
} 
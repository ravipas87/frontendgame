export enum GAME_STATUS {
  WIN = "WIN",
  LOSE = "LOSE",
  TIE = "TIE",
  WAITING_PLAY = "WAITING_PLAY",
}

export enum GAME_OPTIONS {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

export interface GameResult {
  userPlay: GAME_OPTIONS;
  systemPlay: GAME_OPTIONS;
  result: GAME_STATUS;
}

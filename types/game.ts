export interface Position {
  x: number
  y: number
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  nextDirection: Direction
  score: number
  gameOver: boolean
  speed: number
}

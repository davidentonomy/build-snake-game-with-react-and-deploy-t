'use client'

import React from 'react'
import { Position } from '@/types/game'
import { GRID_SIZE, CELL_SIZE, COLORS } from '@/constants/game'

interface GameBoardProps {
  snake: Position[]
  food: Position
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  const isSnakeSegment = (x: number, y: number): boolean => {
    return snake.some((segment) => segment.x === x && segment.y === y)
  }

  const isSnakeHead = (x: number, y: number): boolean => {
    return snake.length > 0 && snake[0].x === x && snake[0].y === y
  }

  const isFood = (x: number, y: number): boolean => {
    return food.x === x && food.y === y
  }

  const getCellStyle = (x: number, y: number): string => {
    if (isFood(x, y)) {
      return 'bg-red-500 rounded-full shadow-lg shadow-red-500/50'
    }
    if (isSnakeHead(x, y)) {
      return 'bg-green-500 rounded-sm shadow-lg shadow-green-500/50'
    }
    if (isSnakeSegment(x, y)) {
      return 'bg-green-400 rounded-sm'
    }
    return 'bg-gray-800/30'
  }

  return (
    <div
      className="border-4 border-green-500/30 rounded-lg shadow-2xl"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        backgroundColor: COLORS.GRID_BG,
      }}
    >
      <div
        className="grid gap-[1px] p-[1px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE - 1}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE - 1}px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          return (
            <div
              key={`${x}-${y}`}
              className={`transition-all duration-100 ${getCellStyle(x, y)}`}
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GameBoard

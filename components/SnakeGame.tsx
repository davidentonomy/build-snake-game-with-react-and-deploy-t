'use client'

import React from 'react'
import { useSnakeGame } from '@/hooks/useSnakeGame'
import GameBoard from '@/components/GameBoard'
import GameInfo from '@/components/GameInfo'
import GameOver from '@/components/GameOver'

const SnakeGame: React.FC = () => {
  const { gameState, resetGame } = useSnakeGame()

  return (
    <div className="flex flex-col items-center gap-6">
      <GameInfo score={gameState.score} speed={gameState.speed} />
      <div className="relative">
        <GameBoard snake={gameState.snake} food={gameState.food} />
        {gameState.gameOver && <GameOver score={gameState.score} onRestart={resetGame} />}
      </div>
    </div>
  )
}

export default SnakeGame

'use client'

import React from 'react'

interface GameOverProps {
  score: number
  onRestart: () => void
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
      <div className="text-center p-8 bg-gray-900/90 rounded-lg border-4 border-red-500/50 shadow-2xl">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
        <p className="text-2xl text-gray-300 mb-2">Final Score</p>
        <p className="text-5xl font-bold text-green-400 mb-6">{score}</p>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-green-500/50"
        >
          Play Again
        </button>
        <p className="text-gray-500 text-sm mt-4">or press SPACE</p>
      </div>
    </div>
  )
}

export default GameOver

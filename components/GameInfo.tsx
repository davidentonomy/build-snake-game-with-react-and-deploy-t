'use client'

import React from 'react'
import { INITIAL_SPEED } from '@/constants/game'

interface GameInfoProps {
  score: number
  speed: number
}

const GameInfo: React.FC<GameInfoProps> = ({ score, speed }) => {
  const speedLevel = Math.floor((INITIAL_SPEED - speed) / 10) + 1

  return (
    <div className="flex gap-8 text-center">
      <div className="bg-gray-800/50 px-8 py-4 rounded-lg border-2 border-green-500/30">
        <div className="text-gray-400 text-sm mb-1">Score</div>
        <div className="text-4xl font-bold text-green-400">{score}</div>
      </div>
      <div className="bg-gray-800/50 px-8 py-4 rounded-lg border-2 border-blue-500/30">
        <div className="text-gray-400 text-sm mb-1">Speed</div>
        <div className="text-4xl font-bold text-blue-400">{speedLevel}</div>
      </div>
    </div>
  )
}

export default GameInfo

'use client'

import SnakeGame from '@/components/SnakeGame'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 text-green-400">Snake Game</h1>
        <p className="text-gray-400">Use arrow keys to control the snake</p>
      </div>
      <SnakeGame />
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Built with React, Next.js, and TypeScript</p>
      </div>
    </main>
  )
}

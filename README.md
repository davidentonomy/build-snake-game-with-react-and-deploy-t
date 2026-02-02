# Snake Game - Entonomy v1

A classic Snake arcade game built with React, Next.js, and TypeScript.

## Features

- **Arrow Key Controls**: Navigate the snake using arrow keys
- **Random Food Spawning**: Food appears randomly on the grid
- **Snake Growth**: Snake grows longer when eating food
- **Score Tracking**: Real-time score display
- **Game Over Detection**: Game ends when snake hits walls or itself
- **Progressive Difficulty**: Speed increases as your score grows
- **Responsive Design**: Clean, modern UI with Tailwind CSS

## How to Play

1. Use **Arrow Keys** to control the snake's direction
2. Eat the red food to grow longer and increase your score
3. Avoid hitting the walls or your own tail
4. The game speeds up as your score increases - how long can you survive?

## Controls

- **Arrow Up**: Move up
- **Arrow Down**: Move down
- **Arrow Left**: Move left
- **Arrow Right**: Move right
- **Space**: Restart game (when game over)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

### Build

```bash
npm run build
```

## Technologies Used

- **Next.js 14**: React framework with static export
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: Custom hooks for game logic

## Game Mechanics

- Grid size: 20x20 cells
- Initial speed: 150ms per move
- Speed increase: Gets faster every 5 points
- Food spawns randomly on empty cells
- Snake starts with length 3

---

Built with ❤️ using React and Next.js

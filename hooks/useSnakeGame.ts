import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState, Direction, Position } from '@/types/game'
import {
  GRID_SIZE,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  SPEED_INCREASE_INTERVAL,
  INITIAL_SNAKE_LENGTH,
  INITIAL_SNAKE_POSITION,
} from '@/constants/game'

const generateFood = (snake: Position[]): Position => {
  let food: Position
  let isOnSnake: boolean

  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    isOnSnake = snake.some((segment) => segment.x === food.x && segment.y === food.y)
  } while (isOnSnake)

  return food
}

const getInitialSnake = (): Position[] => {
  const snake: Position[] = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({
      x: INITIAL_SNAKE_POSITION.x - i,
      y: INITIAL_SNAKE_POSITION.y,
    })
  }
  return snake
}

const getInitialState = (): GameState => {
  const snake = getInitialSnake()
  return {
    snake,
    food: generateFood(snake),
    direction: Direction.RIGHT,
    nextDirection: Direction.RIGHT,
    score: 0,
    gameOver: false,
    speed: INITIAL_SPEED,
  }
}

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialState())
  const gameLoopRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  const resetGame = useCallback(() => {
    setGameState(getInitialState())
    lastUpdateRef.current = 0
  }, [])

  const moveSnake = useCallback(() => {
    setGameState((prevState) => {
      if (prevState.gameOver) return prevState

      const { snake, food, nextDirection, score } = prevState
      const head = snake[0]
      let newHead: Position

      // Calculate new head position based on direction
      switch (nextDirection) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 }
          break
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 }
          break
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y }
          break
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y }
          break
        default:
          newHead = head
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        return { ...prevState, gameOver: true }
      }

      // Check self collision
      if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prevState, gameOver: true }
      }

      // Create new snake
      const newSnake = [newHead, ...snake]

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 1
        const newSpeed = Math.max(
          50,
          INITIAL_SPEED - Math.floor(newScore / SPEED_INCREASE_INTERVAL) * SPEED_INCREMENT
        )

        return {
          ...prevState,
          snake: newSnake,
          food: generateFood(newSnake),
          direction: nextDirection,
          score: newScore,
          speed: newSpeed,
        }
      } else {
        // Remove tail if no food eaten
        newSnake.pop()
        return {
          ...prevState,
          snake: newSnake,
          direction: nextDirection,
        }
      }
    })
  }, [])

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prevState) => {
      // Prevent reversing into itself
      if (
        (prevState.direction === Direction.UP && newDirection === Direction.DOWN) ||
        (prevState.direction === Direction.DOWN && newDirection === Direction.UP) ||
        (prevState.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
        (prevState.direction === Direction.RIGHT && newDirection === Direction.LEFT)
      ) {
        return prevState
      }

      return {
        ...prevState,
        nextDirection: newDirection,
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver && e.key === ' ') {
        e.preventDefault()
        resetGame()
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          changeDirection(Direction.UP)
          break
        case 'ArrowDown':
          e.preventDefault()
          changeDirection(Direction.DOWN)
          break
        case 'ArrowLeft':
          e.preventDefault()
          changeDirection(Direction.LEFT)
          break
        case 'ArrowRight':
          e.preventDefault()
          changeDirection(Direction.RIGHT)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection, resetGame, gameState.gameOver])

  useEffect(() => {
    if (gameState.gameOver) {
      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    const gameLoop = (timestamp: number) => {
      if (lastUpdateRef.current === 0) {
        lastUpdateRef.current = timestamp
      }

      const deltaTime = timestamp - lastUpdateRef.current

      if (deltaTime >= gameState.speed) {
        moveSnake()
        lastUpdateRef.current = timestamp
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.speed, gameState.gameOver, moveSnake])

  return {
    gameState,
    resetGame,
  }
}

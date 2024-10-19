'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400
const BLOCK_SIZE = 10
const INITIAL_SNAKE_SPEED = 10

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let snake = [{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }]
    let direction = { x: BLOCK_SIZE, y: 0 }
    let food = getRandomPosition()
    let bullets: { x: number; y: number; dx: number; dy: number }[] = []

    function getRandomPosition() {
      return {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / BLOCK_SIZE)) * BLOCK_SIZE,
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / BLOCK_SIZE)) * BLOCK_SIZE,
      }
    }

    function drawSnake() {
      ctx.fillStyle = 'black'
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, BLOCK_SIZE, BLOCK_SIZE)
      })
    }

    function drawFood() {
      ctx.fillStyle = 'green'
      ctx.fillRect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE)
    }

    function drawBullets() {
      ctx.fillStyle = 'red'
      bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, BLOCK_SIZE, BLOCK_SIZE)
      })
    }

    function moveSnake() {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
      snake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 1)
        food = getRandomPosition()
      } else {
        snake.pop()
      }
    }

    function checkCollision() {
      const head = snake[0]
      if (
        head.x < 0 || head.x >= CANVAS_WIDTH ||
        head.y < 0 || head.y >= CANVAS_HEIGHT ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true)
      }
    }

    function updateBullets() {
      bullets = bullets.filter(bullet => {
        bullet.x += bullet.dx
        bullet.y += bullet.dy
        return (
          bullet.x >= 0 && bullet.x < CANVAS_WIDTH &&
          bullet.y >= 0 && bullet.y < CANVAS_HEIGHT
        )
      })

      bullets.forEach((bullet, index) => {
        if (bullet.x === food.x && bullet.y === food.y) {
          bullets.splice(index, 1)
          food = getRandomPosition()
          setScore(prevScore => prevScore + 1)
        }
      })
    }

    function gameLoop() {
      if (gameOver) return

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      moveSnake()
      checkCollision()
      updateBullets()
      drawSnake()
      drawFood()
      drawBullets()
    }

    const intervalId = setInterval(gameLoop, 1000 / INITIAL_SNAKE_SPEED)

    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) direction = { x: 0, y: -BLOCK_SIZE }
          break
        case 'ArrowDown':
          if (direction.y === 0) direction = { x: 0, y: BLOCK_SIZE }
          break
        case 'ArrowLeft':
          if (direction.x === 0) direction = { x: -BLOCK_SIZE, y: 0 }
          break
        case 'ArrowRight':
          if (direction.x === 0) direction = { x: BLOCK_SIZE, y: 0 }
          break
        case ' ':
          bullets.push({
            x: snake[0].x,
            y: snake[0].y,
            dx: direction.x,
            dy: direction.y,
          })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isLoading, gameOver])

  const handleRestart = () => {
    setGameOver(false)
    setScore(0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Fortnite Not Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Snake Game with Guns</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-black"
        />
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-center">
              <p className="text-2xl font-bold mb-4">Game Over!</p>
              <Button onClick={handleRestart}>Restart</Button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xl">Score: {score}</p>
      <div className="mt-4">
        <p>Use arrow keys to move</p>
        <p>Press space to shoot</p>
      </div>
    </div>
  )
}

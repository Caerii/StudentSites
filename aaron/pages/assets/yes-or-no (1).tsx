"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<string | null>(null)
  const [hasHat, setHasHat] = useState(false)

  const getRandomAnswer = () => {
    return Math.random() < 0.5 ? "Yes" : "No"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      setAnswer(getRandomAnswer())
    }
  }

  const toggleHat = () => {
    setHasHat(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 max-w-3xl">
        THE ALL POWERFUL LORD OF KNOWLEDGE JEFF THE GUINEA PIG WILL ANSWER YOUR QUESTIONS
      </h1>
      <div className="mb-4 h-[200px] w-[300px] relative overflow-hidden rounded-lg shadow-lg">
        <Image
          src={hasHat ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hat%20hamster-PsfZ8C59dmU94ZFvyaXOcJtUH9fTqn.png" : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YJoIxC1-mwNSFOaPLkhGR5iTJLyXjazXWkhjZt.jpg"}
          alt={hasHat ? "Jeff the Guinea Pig wearing glasses and a top hat" : "Jeff the Guinea Pig wearing glasses"}
          fill
          className="object-cover"
          style={{
            objectPosition: hasHat ? '55% 60%' : 'center',
            transform: hasHat ? 'scale(1.1)' : 'none'
          }}
        />
      </div>
      <Button onClick={toggleHat} className="mb-8 w-64">
        {hasHat ? "Take away Jeff's hat :(" : "Give Jeff a hat"}
      </Button>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">ask jeff a yes or no question</CardTitle>
          <p className="text-center text-sm text-muted-foreground">he will answer with his infinite knowledge</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Get Jeff's Answer
            </Button>
          </form>
          {answer && (
            <div className="mt-6 text-center">
              <p className="font-semibold mb-2">Your question:</p>
              <p className="italic mb-4">{question}</p>
              <p className="font-semibold mb-2">Jeff's answer:</p>
              <p className="text-3xl font-bold">{answer}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
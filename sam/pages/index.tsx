import { useState } from 'react'
import { User, MapPin, Gamepad2, Mail, Trophy, Target, Zap, Brain, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from 'three'
import Link from 'next/link'

function Lambo() {
  const carRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    carRef.current.position.y = Math.sin(time) * 0.05
    carRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
  })

  return (
    <group ref={carRef}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshPhongMaterial color="#00FF00" />
      </mesh>
      {/* Car roof */}
      <mesh position={[0, 0.9, -0.5]}>
        <boxGeometry args={[1.8, 0.4, 2]} />
        <meshPhongMaterial color="#00FF00" />
      </mesh>
      {/* Wheels */}
      {[[-0.9, 0, -1.2], [0.9, 0, -1.2], [-0.9, 0, 1.2], [0.9, 0, 1.2]].map((position, index) => (
        <mesh key={index} position={position}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshPhongMaterial color="#333" />
        </mesh>
      ))}
      {/* Windshield */}
      <mesh position={[0, 0.9, 0.7]} rotation={[-Math.PI / 6, 0, 0]}>
        <planeGeometry args={[1.7, 0.7]} />
        <meshPhongMaterial color="#87CEFA" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function GuineaPig() {
  const guineaPigRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    guineaPigRef.current.position.y = Math.sin(time * 2) * 0.05
    guineaPigRef.current.rotation.y = Math.sin(time) * 0.1
  })

  return (
    <group ref={guineaPigRef} position={[2, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 16, 16]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.6, 0.4]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 0.7, 0.6]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.1, 0.7, 0.6]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      {/* Ears */}
      <mesh position={[0.15, 0.8, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.05, 0.1, 8, 8]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.15, 0.8, 0.3]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.05, 0.1, 8, 8]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

function RizzGenerator() {
  const [rizz, setRizz] = useState("Click the button to generate a friendly compliment!")
  
  const compliments = [
    "You're awesome!",
    "Your smile brightens everyone's day!",
    "You're a great friend!",
    "You're super cool!",
    "You're really fun to be around!",
    "You always have the best ideas!",
    "You're a star at Fortnite!",
    "Your creativity is amazing!",
    "You're really good at making people laugh!",
    "You're a kind and caring person!"
  ]

  const generateRizz = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length)
    setRizz(compliments[randomIndex])
  }

  return (
    <Card className="bg-green-700 rounded-xl shadow-xl overflow-hidden mt-8">
      <CardHeader className="bg-green-600 p-6">
        <CardTitle className="text-4xl font-bold text-center text-yellow-300">Friendly Compliment Generator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-2xl font-semibold text-center text-yellow-300">{rizz}</p>
        <div className="flex justify-center">
          <Button onClick={generateRizz} className="bg-green-500 hover:bg-green-600 text-yellow-300">Generate Compliment</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function MemeTierList() {
  const tiers = [
    { name: 'S', color: 'bg-red-500', memes: [{ name: 'Grumpy Cat', link: 'https://www.amazon.com/Grumpy-Cat-2025-Wall-Calendar/dp/1797229958/' }] },
    { name: 'A', color: 'bg-orange-500', memes: [{ name: 'Nick Eh 30', link: 'https://discord.com/invite/NickEh30' }] },
    { name: 'B', color: 'bg-yellow-500', memes: [
      { name: 'Doge', link: 'https://www.reddit.com/r/meemes_4life/' },
      { name: 'Distracted Boyfriend', link: 'https://www.reddit.com/r/meemes_4life/' }
    ]},
    { name: 'C', color: 'bg-green-500', memes: [{ name: 'Surprised Pikachu', link: 'https://www.reddit.com/r/meemes_4life/' }] },
    { name: 'D', color: 'bg-blue-500', memes: [
      { name: 'Stonks', link: 'https://www.reddit.com/r/meemes_4life/' },
      { name: 'Bad Luck Brian', link: 'https://www.reddit.com/r/meemes_4life/' }
    ]},
  ]

  return (
    <Card className="bg-green-700 rounded-xl shadow-xl overflow-hidden mt-8">
      <CardHeader className="bg-green-600 p-6">
        <CardTitle className="text-4xl font-bold text-center text-yellow-300">Meme Tier List</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex items-center space-x-4">
            <div className={`${tier.color} w-12 h-12 flex items-center justify-center rounded-full`}>
              <span className="text-2xl font-bold text-white">{tier.name}</span>
            </div>
            <div className="flex-1 bg-green-800 p-4 rounded-lg">
              <p className="text-lg font-medium text-yellow-300">
                {tier.memes.map((meme, index) => (
                  <span key={meme.name}>
                    {index > 0 && ', '}
                    {meme.link ? (
                      <a 
                        href={meme.link} 
                        className="underline hover:text-yellow-100" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(meme.link, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        {meme.name}
                      </a>
                    ) : (
                      meme.name
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function CombinedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-600 flex flex-col items-center justify-center p-4" style={{ fontFamily: "'Times New Roman', serif" }}>
      <div className="w-full max-w-2xl space-y-8 mb-8">
        <Card className="bg-green-700 rounded-xl shadow-xl overflow-hidden">
          <CardHeader className="bg-green-600 p-6">
            <CardTitle className="text-4xl font-bold text-center text-yellow-300">Hi, I'm Sam!</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-2xl font-semibold text-center text-yellow-300">All About Me</p>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <User className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">I'm 11 years old</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">I live in the USA</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Gamepad2 className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">I use a VR headset at Robo Hub to learn about AI</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Mail className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300 break-all">samchoolspringer@gmail.com</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-700 rounded-xl shadow-xl overflow-hidden">
          <CardHeader className="bg-green-600 p-6">
            <CardTitle className="text-4xl font-bold text-center text-yellow-300">My Fortnite Achievements</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">Won 50 matches</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Target className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">Reached level 100 in Battle Pass</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Zap className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">Improved reaction time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Brain className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">Learned strategic thinking</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-yellow-300" />
              </div>
              <p className="text-lg font-medium text-yellow-300">Made friends from around the world</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-screen max-w-2xl">
        <Card className="bg-green-700 rounded-xl shadow-xl overflow-hidden h-full">
          <CardHeader className="bg-green-600 p-6">
            <CardTitle className="text-4xl font-bold text-center text-yellow-300">My 3D Lambo and Guinea Pig</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[calc(100%-5rem)]">
            <Canvas camera={{ position: [0, 2, 5] }}>
              <Suspense fallback={null}>
                <Lambo />
                <GuineaPig />
                <OrbitControls />
                <Environment preset="sunset" background  />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
              </Suspense>
            </Canvas>
          </CardContent>
        </Card>
      </div>

      <MemeTierList />
      
      <RizzGenerator />
    </div>
  )
}

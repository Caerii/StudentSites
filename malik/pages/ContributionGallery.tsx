'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Upload, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

interface Contribution {
  id: string
  bio: string
  file: string
  type: string
  fileName: string
}

export default function ContributionGallery() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [bio, setBio] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const { toast } = useToast()

  const loadContributions = useCallback(() => {
    setIsInitialLoading(true)
    try {
      const storedContributions = localStorage.getItem('contributions')
      if (storedContributions) {
        setContributions(JSON.parse(storedContributions))
      }
    } catch (error) {
      console.error('Failed to load stored contributions:', error)
      toast({
        title: "Error",
        description: "Failed to load stored contributions. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsInitialLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadContributions()
  }, [loadContributions])

  const generateUniqueFileName = (fileName: string) => {
    const extension = fileName.split('.').pop()
    const baseName = fileName.slice(0, fileName.lastIndexOf('.'))
    let uniqueName = fileName
    let counter = 1

    while (contributions.some(contribution => contribution.fileName === uniqueName)) {
      uniqueName = `${baseName}_(${counter}).${extension}`
      counter++
    }

    return uniqueName
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isLoading || !files || files.length === 0) return

    setIsLoading(true)
    setUploadProgress(0)

    const totalFiles = files.length
    let processedFiles = 0

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i]
      try {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader()

          reader.onload = (e) => {
            const uniqueFileName = generateUniqueFileName(file.name)

            const newContribution: Contribution = {
              id: Date.now().toString(),
              bio,
              file: e.target?.result as string,
              type: file.type,
              fileName: uniqueFileName
            }

            setContributions(prev => {
              const updated = [...prev, newContribution]
              localStorage.setItem('contributions', JSON.stringify(updated))
              return updated
            })

            processedFiles++
            setUploadProgress((processedFiles / totalFiles) * 100)
            resolve()
          }

          reader.onerror = () => reject(new Error('File reading failed'))

          reader.readAsDataURL(file)
        })
      } catch (error) {
        console.error('Error processing file:', error)
        toast({
          title: "Error",
          description: `Failed to process file ${file.name}. Please try again.`,
          variant: "destructive",
        })
      }
    }

    setBio('')
    setFiles(null)
    setIsLoading(false)
    setUploadProgress(0)
    toast({
      title: "Success",
      description: `${totalFiles} file(s) uploaded successfully.`,
    })
  }

  const handleDelete = (id: string) => {
    try {
      const updatedContributions = contributions.filter(contribution => contribution.id !== id)
      setContributions(updatedContributions)
      localStorage.setItem('contributions', JSON.stringify(updatedContributions))
      toast({
        title: "Success",
        description: "Contribution deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting contribution:', error)
      toast({
        title: "Error",
        description: "Failed to delete the contribution. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isInitialLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Contribution Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardFooter className="flex flex-col items-start pt-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Contribution Gallery</h1>
      
      <Card className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
            className="w-full resize-none"
            required
          />
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              accept="image/*,audio/*,video/*"
              required
              multiple
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="flex-shrink-0">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Submit
            </Button>
          </div>
          {isLoading && (
            <Progress value={uploadProgress} className="w-full" />
          )}
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((contribution) => (
          <Card key={contribution.id} className="overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-grow">
              {contribution.type.startsWith('image/') && (
                <div className="relative w-full h-48">
                  <Image
                    src={contribution.file}
                    alt={contribution.fileName}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              {contribution.type.startsWith('audio/') && (
                <div className="bg-secondary h-48 flex items-center justify-center">
                  <audio controls className="w-full px-4">
                    <source src={contribution.file} type={contribution.type} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              {contribution.type.startsWith('video/') && (
                <video controls className="w-full h-48 object-cover">
                  <source src={contribution.file} type={contribution.type} />
                  Your browser does not support the video element.
                </video>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-4">
              <p className="text-sm mb-2">{contribution.bio}</p>
              <p className="text-xs text-gray-500 mb-2">File: {contribution.fileName}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(contribution.id)}
                className="self-end"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Star, ChevronDown, MessageCircle, Share2, Users, UserPlus, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MovieDetails() {
  const [userRating, setUserRating] = useState(0)
  const [review, setReview] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [currentStep, setCurrentStep] = useState('sharedLink')

  const movieDetails = {
    title: "Star Wars: Episode IV - A New Hope",
    year: "1977",
    rating: "PG",
    runtime: "2h 1min",
    genres: ["Action", "Adventure", "Fantasy"],
    imdbRating: 8.6,
    plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    director: "George Lucas",
    stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    setShowReviewForm(true)
    setCurrentStep('submitRating')
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted review:', { rating: userRating, review })
    setShowReviewForm(false)
    setReview('')
    setCurrentStep('updatedDetail')
  }

  const renderStepIndicator = () => {
    const steps = ['sharedLink', 'submitRating', 'updatedDetail', 'profileJourney', 'groupJourney']
    return (
      <div className="flex justify-between mb-4 px-4">
        {steps.map((step, index) => (
          <div key={step} className={`flex items-center ${index < steps.indexOf(currentStep) ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full ${index <= steps.indexOf(currentStep) ? 'bg-primary' : 'bg-gray-300'}`}></div>
            {index < steps.length - 1 && <div className={`h-0.5 w-full ${index < steps.indexOf(currentStep) ? 'bg-primary' : 'bg-gray-300'}`}></div>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {renderStepIndicator()}
      <div className="relative">
        <img
          src="/placeholder.svg?height=600&width=400"
          alt="Star Wars: Episode IV - A New Hope Poster"
          className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4">
          <h1 className="text-2xl font-bold text-black">{movieDetails.title}</h1>
          <p className="text-sm text-gray-700">{movieDetails.year} • {movieDetails.rating} • {movieDetails.runtime}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-full p-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 inline-block cursor-pointer ${star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-around py-4 border-b border-gray-200">
        <Button variant="ghost" className="flex flex-col items-center text-black">
          <Star className="mb-1" />
          Rate
        </Button>
        <Button variant="ghost" className="flex flex-col items-center text-black">
          <MessageCircle className="mb-1" />
          Reviews
        </Button>
        <Button variant="ghost" className="flex flex-col items-center text-black">
          <Share2 className="mb-1" />
          Share
        </Button>
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="p-4 bg-gray-100">
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Submit Review</Button>
        </form>
      )}

      <ScrollArea className="flex-grow">
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">IMDb Rating</h2>
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-current w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">{movieDetails.imdbRating}</span>
              <span className="text-sm ml-2">/10</span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Plot</h2>
            <p>{movieDetails.plot}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Director</h2>
            <p>{movieDetails.director}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Stars</h2>
            <ul>
              {movieDetails.stars.map((star, index) => (
                <li key={index}>{star}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movieDetails.genres.map((genre, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile Journey</TabsTrigger>
              <TabsTrigger value="group">Group Journey</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="space-y-4">
                <Button className="w-full" variant="outline" onClick={() => setCurrentStep('profileJourney')}>
                  Create Profile
                </Button>
                <Input placeholder="Username" />
                <Input placeholder="Email" type="email" />
              </div>
            </TabsContent>
            <TabsContent value="group">
              <div className="space-y-4">
                <Button className="w-full" variant="outline" onClick={() => setCurrentStep('groupJourney')}>
                  <Users className="mr-2 h-4 w-4" /> Join Existing Group
                </Button>
                <Button className="w-full" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" /> Create New Group
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full">View Group Details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Group: Movie Enthusiasts</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>Members: 42</div>
                <div>Average Rating: 4.2 ⭐</div>
                <Button className="w-full">
                  Send title to group for rating <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ScrollArea>
    </div>
  )
}
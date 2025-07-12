"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark, Share, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Post {
  id: string
  author: {
    name: string
    avatar?: string
    verified?: boolean
  }
  content: string
  category: string
  likes: number
  comments: number
  timestamp: string
  image?: string
  isLiked: boolean
  isSaved: boolean
}

export function GetInspired() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      content:
        "Just completed my first 10K run! 6 months ago I could barely run for 5 minutes. The key was starting small and being consistent. Every step counts! 🏃‍♀️",
      category: "Health",
      likes: 124,
      comments: 18,
      timestamp: "2h ago",
      image: "/placeholder.svg?height=200&width=300",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      author: { name: "Mike Chen", verified: true },
      content:
        'Mindset shift: Instead of saying "I have to", try saying "I get to". I get to work on my goals. I get to learn new skills. I get to grow. Changes everything! 💪',
      category: "Personal",
      likes: 89,
      comments: 12,
      timestamp: "4h ago",
      isLiked: true,
      isSaved: false,
    },
    {
      id: "3",
      author: { name: "Emma Rodriguez" },
      content:
        "Saved my first $1000 this year! Started with just $5 a week. Small amounts add up faster than you think. Here's my simple strategy...",
      category: "Finance",
      likes: 156,
      comments: 24,
      timestamp: "6h ago",
      isLiked: false,
      isSaved: true,
    },
    {
      id: "4",
      author: { name: "David Kim" },
      content:
        "Learning Spanish for 100 days straight! Using the 80/20 rule - focusing on the most common 1000 words first. Already having basic conversations! 🇪🇸",
      category: "Education",
      likes: 67,
      comments: 9,
      timestamp: "8h ago",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "5",
      author: { name: "Lisa Park" },
      content:
        "Career update: Just got promoted to Senior Developer! 2 years ago I was teaching myself to code. Persistence and continuous learning pays off. Never give up on your dreams! 👩‍💻",
      category: "Career",
      likes: 203,
      comments: 31,
      timestamp: "12h ago",
      image: "/placeholder.svg?height=150&width=300",
      isLiked: true,
      isSaved: true,
    },
  ])

  const [filterCategory, setFilterCategory] = useState("all")

  const categories = ["all", "Health", "Personal", "Finance", "Education", "Career", "Family"]

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const toggleSave = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

  const filteredPosts = filterCategory === "all" ? posts : posts.filter((post) => post.category === filterCategory)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Health: "bg-green-100 text-green-800",
      Personal: "bg-purple-100 text-purple-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Education: "bg-blue-100 text-blue-800",
      Career: "bg-orange-100 text-orange-800",
      Family: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Filter Section */}
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-4 space-y-3">
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="font-medium text-sm">{post.author.name}</h4>
                      {post.author.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
              </div>

              {/* Post Content */}
              <p className="text-sm text-gray-900 leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-48 object-cover" />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                    <span className="text-xs">{post.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSave(post.id)}
                    className={`p-1 ${post.isSaved ? "text-blue-500" : "text-gray-600"}`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-current" : ""}`} />
                  </Button>

                  <Button variant="ghost" size="sm" className="p-1 text-gray-600">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

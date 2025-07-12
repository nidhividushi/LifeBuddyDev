"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, UserPlus, Search, Star, MapPin, Calendar } from "lucide-react"

interface Mentor {
  id: string
  name: string
  avatar?: string
  expertise: string[]
  rating: number
  location: string
  bio: string
  isConnected: boolean
  responseTime: string
}

interface Community {
  id: string
  name: string
  description: string
  members: number
  category: string
  isJoined: boolean
  recentActivity: string
}

interface Connection {
  id: string
  name: string
  avatar?: string
  relationship: "mentor" | "mentee" | "peer"
  sharedGoals: string[]
  lastActive: string
}

export function SupportNetwork() {
  const [mentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["Health", "Fitness", "Nutrition"],
      rating: 4.9,
      location: "San Francisco, CA",
      bio: "Certified nutritionist and marathon runner with 10+ years helping people achieve their health goals.",
      isConnected: false,
      responseTime: "< 2 hours",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      expertise: ["Finance", "Investment", "Budgeting"],
      rating: 4.8,
      location: "New York, NY",
      bio: "Financial advisor specializing in personal finance and wealth building for young professionals.",
      isConnected: true,
      responseTime: "< 1 hour",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      expertise: ["Career", "Leadership", "Tech"],
      rating: 4.9,
      location: "Austin, TX",
      bio: "Senior Software Engineer turned career coach. Helping developers advance their careers.",
      isConnected: false,
      responseTime: "< 4 hours",
    },
  ])

  const [communities] = useState<Community[]>([
    {
      id: "1",
      name: "Marathon Runners United",
      description: "A supportive community for aspiring and experienced marathon runners",
      members: 2847,
      category: "Health",
      isJoined: true,
      recentActivity: "12 new posts today",
    },
    {
      id: "2",
      name: "Financial Freedom Seekers",
      description: "Learn and share strategies for achieving financial independence",
      members: 5632,
      category: "Finance",
      isJoined: false,
      recentActivity: "8 new posts today",
    },
    {
      id: "3",
      name: "Language Learning Hub",
      description: "Practice languages with native speakers and fellow learners",
      members: 3421,
      category: "Education",
      isJoined: true,
      recentActivity: "15 new posts today",
    },
    {
      id: "4",
      name: "Career Growth Network",
      description: "Professional development and career advancement discussions",
      members: 4156,
      category: "Career",
      isJoined: false,
      recentActivity: "6 new posts today",
    },
  ])

  const [connections] = useState<Connection[]>([
    {
      id: "1",
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      relationship: "mentor",
      sharedGoals: ["Save $10,000", "Learn Investment"],
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Amy Chen",
      relationship: "peer",
      sharedGoals: ["Run Marathon", "Learn Spanish"],
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Jake Miller",
      relationship: "mentee",
      sharedGoals: ["Career Growth"],
      lastActive: "3 hours ago",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const connectWithMentor = (mentorId: string) => {
    // Simulate connection logic
    console.log(`Connecting with mentor ${mentorId}`)
  }

  const joinCommunity = (communityId: string) => {
    // Simulate joining community
    console.log(`Joining community ${communityId}`)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Health: "bg-green-100 text-green-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Career: "bg-blue-100 text-blue-800",
      Education: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      mentor: "bg-blue-100 text-blue-800",
      mentee: "bg-green-100 text-green-800",
      peer: "bg-purple-100 text-purple-800",
    }
    return colors[relationship] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <Tabs defaultValue="mentors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="connections">My Network</TabsTrigger>
        </TabsList>

        <TabsContent value="mentors" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors by expertise..."
              className="pl-10"
            />
          </div>

          {/* Mentors List */}
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{mentor.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{mentor.rating}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{mentor.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={mentor.isConnected ? "outline" : "default"}
                          onClick={() => connectWithMentor(mentor.id)}
                        >
                          {mentor.isConnected ? (
                            <>
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4 mr-1" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-sm text-gray-700">{mentor.bio}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">Responds {mentor.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <div className="space-y-4">
            {communities.map((community) => (
              <Card key={community.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{community.name}</h3>
                        <Badge className={getCategoryColor(community.category)}>{community.category}</Badge>
                      </div>

                      <p className="text-sm text-gray-700">{community.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{community.members.toLocaleString()} members</span>
                        </div>
                        <span>•</span>
                        <span>{community.recentActivity}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={community.isJoined ? "outline" : "default"}
                      onClick={() => joinCommunity(community.id)}
                    >
                      {community.isJoined ? "View" : "Join"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                My Network ({connections.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {connection.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{connection.name}</h4>
                        <Badge className={getRelationshipColor(connection.relationship)}>
                          {connection.relationship}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Shared goals: {connection.sharedGoals.join(", ")}</div>
                      <div className="text-xs text-gray-500">Last active: {connection.lastActive}</div>
                    </div>
                  </div>

                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">Marathon Training Group Run</div>
                <div className="text-sm text-gray-600">Tomorrow, 7:00 AM • Central Park</div>
                <div className="text-xs text-gray-500">12 members attending</div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium">Financial Planning Workshop</div>
                <div className="text-sm text-gray-600">Friday, 6:00 PM • Online</div>
                <div className="text-xs text-gray-500">45 members attending</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium">Spanish Conversation Practice</div>
                <div className="text-sm text-gray-600">Sunday, 3:00 PM • Coffee Shop</div>
                <div className="text-xs text-gray-500">8 members attending</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

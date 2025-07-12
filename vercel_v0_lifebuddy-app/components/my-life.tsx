"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Calendar,
  TrendingUp,
  Target,
  Heart,
  DollarSign,
  Users,
  Briefcase,
  GraduationCap,
  Home,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  category: string
  mood?: string
}

interface LifeArea {
  name: string
  icon: any
  progress: number
  color: string
}

export function MyLife() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "First 5K Completed!",
      content:
        "Today I completed my first 5K run without stopping. It took me 32 minutes, but I did it! Six months ago, I could barely run for 2 minutes. This feels like such a huge milestone.",
      date: "2024-01-15",
      category: "Health",
      mood: "Excited",
    },
    {
      id: "2",
      title: "Learning Spanish Progress",
      content:
        "Had my first conversation entirely in Spanish today with a colleague. It was basic, but we understood each other! All those Duolingo sessions are paying off.",
      date: "2024-01-10",
      category: "Education",
      mood: "Proud",
    },
    {
      id: "3",
      title: "Budget Milestone",
      content:
        "Successfully saved $500 this month by meal prepping and cutting unnecessary subscriptions. Small changes are making a big difference.",
      date: "2024-01-05",
      category: "Finance",
      mood: "Accomplished",
    },
  ])

  const [newEntry, setNewEntry] = useState({ title: "", content: "", category: "Personal" })

  const lifeAreas: LifeArea[] = [
    { name: "Health", icon: Heart, progress: 75, color: "text-red-500" },
    { name: "Finance", icon: DollarSign, progress: 60, color: "text-green-500" },
    { name: "Career", icon: Briefcase, progress: 80, color: "text-blue-500" },
    { name: "Education", icon: GraduationCap, progress: 65, color: "text-purple-500" },
    { name: "Family", icon: Users, progress: 85, color: "text-pink-500" },
    { name: "Personal", icon: Home, progress: 70, color: "text-orange-500" },
  ]

  const goalStats = {
    total: 8,
    completed: 2,
    inProgress: 4,
    planned: 2,
  }

  const addJournalEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split("T")[0],
      category: newEntry.category,
    }

    setJournalEntries((prev) => [entry, ...prev])
    setNewEntry({ title: "", content: "", category: "Personal" })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Health: "bg-red-100 text-red-800",
      Finance: "bg-green-100 text-green-800",
      Career: "bg-blue-100 text-blue-800",
      Education: "bg-purple-100 text-purple-800",
      Family: "bg-pink-100 text-pink-800",
      Personal: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <Tabs defaultValue="journal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-4">
          {/* Add New Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Journal Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={newEntry.title}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Entry title..."
              />
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="What's on your mind? Share your thoughts, wins, or learnings..."
                rows={4}
              />
              <div className="flex justify-between items-center">
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Career">Career</option>
                  <option value="Education">Education</option>
                  <option value="Family">Family</option>
                </select>
                <Button onClick={addJournalEntry}>Add Entry</Button>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entries */}
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-lg">{entry.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(entry.category)}>{entry.category}</Badge>
                      {entry.mood && <Badge variant="outline">{entry.mood}</Badge>}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {/* Goal Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Goal Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{goalStats.total}</div>
                  <div className="text-sm text-gray-600">Total Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{goalStats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{goalStats.inProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{goalStats.planned}</div>
                  <div className="text-sm text-gray-600">Planned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Life Balance Wheel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Life Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifeAreas.map((area) => {
                const Icon = area.icon
                return (
                  <div key={area.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${area.color}`} />
                        <span className="font-medium">{area.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{area.progress}%</span>
                    </div>
                    <Progress value={area.progress} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🏃</span>
                </div>
                <div>
                  <div className="font-medium">First 5K Completed</div>
                  <div className="text-sm text-gray-600">Health • 5 days ago</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💰</span>
                </div>
                <div>
                  <div className="font-medium">Saved $500 This Month</div>
                  <div className="text-sm text-gray-600">Finance • 1 week ago</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🗣️</span>
                </div>
                <div>
                  <div className="font-medium">First Spanish Conversation</div>
                  <div className="text-sm text-gray-600">Education • 2 weeks ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

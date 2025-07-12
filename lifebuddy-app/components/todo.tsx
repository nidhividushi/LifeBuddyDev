"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  title: string
  completed: boolean
  category: string
  status: "planned" | "in-progress" | "completed" | "looking-for-mentor"
  dueDate?: string
  subtasks?: Task[]
}

export function ToDo() {
  const [goals, setGoals] = useState<Task[]>([
    {
      id: "1",
      title: "Run a marathon",
      completed: false,
      category: "Health",
      status: "in-progress",
      dueDate: "2024-06-15",
      subtasks: [
        { id: "1-1", title: "Create training schedule", completed: true, category: "Health", status: "completed" },
        { id: "1-2", title: "Buy running shoes", completed: true, category: "Health", status: "completed" },
        { id: "1-3", title: "Complete 5K run", completed: false, category: "Health", status: "in-progress" },
        { id: "1-4", title: "Complete 10K run", completed: false, category: "Health", status: "planned" },
      ],
    },
    {
      id: "2",
      title: "Learn Spanish",
      completed: false,
      category: "Education",
      status: "looking-for-mentor",
      dueDate: "2024-12-31",
    },
    {
      id: "3",
      title: "Save $10,000",
      completed: false,
      category: "Finance",
      status: "in-progress",
      dueDate: "2024-08-30",
    },
  ])

  const [newGoal, setNewGoal] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Health")
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set(["1"]))
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const categories = ["Health", "Education", "Finance", "Career", "Personal", "Family"]
  const statuses = [
    { value: "planned", label: "Planned", color: "bg-gray-100 text-gray-800" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
    { value: "looking-for-mentor", label: "Looking for Mentor", color: "bg-purple-100 text-purple-800" },
  ]

  const addGoal = () => {
    if (!newGoal.trim()) return

    const goal: Task = {
      id: Date.now().toString(),
      title: newGoal,
      completed: false,
      category: selectedCategory,
      status: "planned",
    }

    setGoals((prev) => [...prev, goal])
    setNewGoal("")
  }

  const toggleGoalExpansion = (goalId: string) => {
    const newExpanded = new Set(expandedGoals)
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId)
    } else {
      newExpanded.add(goalId)
    }
    setExpandedGoals(newExpanded)
  }

  const updateTaskStatus = (goalId: string, taskId: string | null, completed: boolean) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          if (taskId === null) {
            // Update main goal
            return { ...goal, completed, status: completed ? "completed" : goal.status }
          } else {
            // Update subtask
            const updatedSubtasks = goal.subtasks?.map((subtask) =>
              subtask.id === taskId
                ? { ...subtask, completed, status: completed ? "completed" : subtask.status }
                : subtask,
            )
            return { ...goal, subtasks: updatedSubtasks }
          }
        }
        return goal
      }),
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = statuses.find((s) => s.value === status)
    return statusConfig ? <Badge className={statusConfig.color}>{statusConfig.label}</Badge> : null
  }

  const filteredGoals = filterStatus === "all" ? goals : goals.filter((goal) => goal.status === filterStatus)

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* Add Goal Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter your goal..."
            onKeyPress={(e) => e.key === "Enter" && addGoal()}
          />
          <div className="flex space-x-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addGoal}>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <div className="flex space-x-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Goals</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {filteredGoals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={(checked) => updateTaskStatus(goal.id, null, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-medium ${goal.completed ? "line-through text-gray-500" : ""}`}>
                        {goal.title}
                      </h3>
                      {goal.subtasks && goal.subtasks.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleGoalExpansion(goal.id)}
                          className="p-1 h-6 w-6"
                        >
                          {expandedGoals.has(goal.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(goal.status)}
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                  </div>

                  {goal.dueDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </div>
                  )}

                  {/* Subtasks */}
                  {goal.subtasks && expandedGoals.has(goal.id) && (
                    <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                      {goal.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center space-x-2">
                          <Checkbox
                            checked={subtask.completed}
                            onCheckedChange={(checked) => updateTaskStatus(goal.id, subtask.id, checked as boolean)}
                          />
                          <span className={`text-sm ${subtask.completed ? "line-through text-gray-500" : ""}`}>
                            {subtask.title}
                          </span>
                          {getStatusBadge(subtask.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Play, Pause } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: string
  isAudio?: boolean
  audioUrl?: string
  actions?: Array<{ label: string; action: string }>
}

export function Conversations() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "What goal would you like to add?",
      timestamp: "12:30",
    },
    {
      id: "2",
      type: "user",
      content: "I want to run a marathon.",
      timestamp: "12:30",
    },
    {
      id: "3",
      type: "ai",
      content: 'Got it! I\'ve added "Run a marathon" to your goals.',
      timestamp: "12:30",
      actions: [{ label: "Add Goal", action: "add-goal" }],
    },
    {
      id: "4",
      type: "user",
      content: "Audio message: I have a 7 a.m.",
      timestamp: "12:30",
      isAudio: true,
      audioUrl: "/audio/sample.mp3",
    },
    {
      id: "5",
      type: "ai",
      content: "I'll remind you at 7 a.m. every day.",
      timestamp: "12:30",
      actions: [{ label: "Set Reminder", action: "set-reminder" }],
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: getActionsForMessage(inputMessage),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("goal")) {
      return "That sounds like a great goal! I can help you break it down into smaller steps and track your progress."
    }
    if (lowerMessage.includes("remind")) {
      return "I'll set up that reminder for you. Consistency is key to achieving your goals!"
    }
    if (lowerMessage.includes("motivation") || lowerMessage.includes("motivated")) {
      return "Remember, every small step counts! You've got this. What specific area would you like motivation for?"
    }
    return "I'm here to help you achieve your goals! How can I support you today?"
  }

  const getActionsForMessage = (message: string): Array<{ label: string; action: string }> => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("goal")) {
      return [{ label: "Add Goal", action: "add-goal" }]
    }
    if (lowerMessage.includes("remind")) {
      return [{ label: "Set Reminder", action: "set-reminder" }]
    }
    return []
  }

  const handleAction = (action: string) => {
    // Simulate action handling
    const actionMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: `Action "${action}" has been completed!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, actionMessage])
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false)
        const audioMessage: Message = {
          id: Date.now().toString(),
          type: "user",
          content: "Audio message: I need help staying motivated",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAudio: true,
        }
        setMessages((prev) => [...prev, audioMessage])
      }, 2000)
    }
  }

  const toggleAudioPlayback = (messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(messageId)
      // Simulate audio playback
      setTimeout(() => setPlayingAudio(null), 3000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-xs ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback>{message.type === "user" ? "U" : "🤖"}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.isAudio && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleAudioPlayback(message.id)}
                        className="p-1 h-6 w-6"
                      >
                        {playingAudio === message.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </Button>
                      <div className="flex-1 bg-gray-300 rounded-full h-1">
                        <div className="bg-gray-600 h-1 rounded-full w-1/3"></div>
                      </div>
                      <span className="text-xs">0:06</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                {message.actions && (
                  <div className="flex flex-wrap gap-2">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(action.action)}
                        className="text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Button size="sm" variant={isRecording ? "destructive" : "outline"} onClick={toggleRecording} className="p-2">
            <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`} />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="px-4">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

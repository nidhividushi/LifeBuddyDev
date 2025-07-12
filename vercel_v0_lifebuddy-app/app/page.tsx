"use client"

import { useState } from "react"
import { Conversations } from "@/components/conversations"
import { ToDo } from "@/components/todo"
import { GetInspired } from "@/components/get-inspired"
import { MyLife } from "@/components/my-life"
import { SupportNetwork } from "@/components/support-network"
import { MessageCircle, CheckSquare, Lightbulb, User, Users } from "lucide-react"

export default function LifeBuddyApp() {
  const [activeTab, setActiveTab] = useState("conversations")

  const tabs = [
    { id: "conversations", label: "Conversations", icon: MessageCircle, component: Conversations },
    { id: "todo", label: "To Do", icon: CheckSquare, component: ToDo },
    { id: "inspired", label: "Get Inspired", icon: Lightbulb, component: GetInspired },
    { id: "mylife", label: "My Life", icon: User, component: MyLife },
    { id: "support", label: "Support Network", icon: Users, component: SupportNetwork },
  ]

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || Conversations

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto border-x border-gray-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-900">LifeBuddy</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ActiveComponent />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-1">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

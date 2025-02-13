"use client"

import { LucideIcon, Shield } from "lucide-react"
import { Modal } from "./modal"

interface Topic {
  id: string
  title: string
  category: string
  content: string
  description: string
}

interface ContentProps {
  topics: Topic[]
  categoryIcons: Record<string, LucideIcon>
  selectedTopic: Topic | null
  onSelectTopic: (topic: Topic | null) => void
}

export function Content({ topics, categoryIcons, selectedTopic, onSelectTopic }: ContentProps) {
  return (
    <main className="fixed top-[65px] right-0 bottom-0 left-64 overflow-auto">
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic) => {
            const CategoryIcon = categoryIcons[topic.category] || Shield
            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all hover:border-primary text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h2>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <Modal isOpen={!!selectedTopic} onClose={() => onSelectTopic(null)}>
        {selectedTopic && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="flex items-center space-x-2 mb-6">
              {(() => {
                const CategoryIcon = categoryIcons[selectedTopic.category] || Shield
                return <CategoryIcon className="h-6 w-6 text-primary" />
              })()}
              <h1 className="text-2xl font-bold text-foreground m-0">{selectedTopic.title}</h1>
            </div>
            <p className="text-muted-foreground mb-8">{selectedTopic.description}</p>
            <div className="whitespace-pre-wrap font-mono text-muted-foreground">
              {selectedTopic.content}
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}

"use client"

import { LucideIcon } from "lucide-react"

interface Category {
  name: string
  icon: LucideIcon
}

interface NavbarProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function Navbar({ categories, selectedCategory, onSelectCategory }: NavbarProps) {
  return (
    <nav className="fixed top-[65px] left-0 bottom-0 w-64 bg-card border-r border-border">
      <div className="h-full overflow-y-auto">
        <div className="p-4 space-y-1">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

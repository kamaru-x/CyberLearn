"use client"

import { Shield } from "lucide-react"

interface HeaderProps {
  onSearch: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] flex bg-background z-20">
      <div className="w-64 px-5 border-r border-b border-border flex items-center bg-card">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-xl text-foreground">CyberLearn</h1>
        </div>
      </div>
      <div className="flex-1 px-5 border-b border-border flex items-center">
        <input
          type="text"
          placeholder="Search topics..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </header>
  )
}

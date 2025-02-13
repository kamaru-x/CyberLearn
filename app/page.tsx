"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { 
  Moon, 
  Sun, 
  LayoutGrid,
  Network,
  Terminal,
  Shield,
  Cloud,
  Database,
  Smartphone,
  Code,
  Lock,
  Wifi,
  Server,
  HardDrive,
  Cpu,
  Globe,
  Key,
  Bug,
  FileCode,
  Binary,
} from "lucide-react"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { Content } from "@/components/content"

const categoryIcons = {
  All: LayoutGrid,
  Networking: Network,
  Linux: Terminal,
  "Web Security": Shield,
  "Cloud Security": Cloud,
  "Database Security": Database,
  "Mobile Security": Smartphone,
  Programming: Code,
  Cryptography: Lock,
  "Wireless Security": Wifi,
  "Server Security": Server,
  "Hardware Security": HardDrive,
  "System Security": Cpu,
  "Web Development": Globe,
  "Access Control": Key,
  "Bug Bounty": Bug,
  "Code Analysis": FileCode,
  "Binary Analysis": Binary,
}

const categories = Object.entries(categoryIcons).map(([name, icon]) => ({
  name,
  icon,
}))

// Generate 100 dummy topics
const generateDummyTopics = () => {
  const topics = []
  const categoryNames = Object.keys(categoryIcons).filter(cat => cat !== "All")

  for (let i = 1; i <= 100; i++) {
    const category = categoryNames[Math.floor(Math.random() * categoryNames.length)]
    topics.push({
      id: i.toString(),
      title: `Topic ${i}: ${category} Fundamentals`,
      description: `Learn the basics of ${category} and common practices`,
      category,
      content: `
# ${category} Fundamentals - Topic ${i}

## Overview

This is a comprehensive guide to understanding ${category}. We'll cover essential concepts and best practices.

## Key Topics

1. Introduction to ${category}
   - Basic concepts
   - Core principles
   - Common tools

2. Advanced Techniques
   - Professional workflows
   - Industry standards
   - Best practices

3. Practical Applications
   - Real-world examples
   - Case studies
   - Hands-on exercises

4. Security Considerations
   - Common vulnerabilities
   - Protection mechanisms
   - Security best practices

## Additional Resources

- Online documentation
- Community forums
- Professional certifications
- Training materials

## Practice Exercises

1. Exercise 1: Basic Implementation
2. Exercise 2: Advanced Concepts
3. Exercise 3: Security Analysis
4. Exercise 4: Performance Optimization

## Summary

This guide provides a solid foundation in ${category}. Continue practicing and exploring advanced topics to master this field.
    `
    })
  }
  return topics
}

const topics = generateDummyTopics()

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[0] | null>(null)
  const { theme, setTheme } = useTheme()

  // Wait until mounted to show content to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTopics = topics.filter((topic) => {
    const categoryMatch = selectedCategory === "All" || topic.category === selectedCategory
    const searchMatch = topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      <Navbar 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Content 
        topics={filteredTopics} 
        categoryIcons={categoryIcons} 
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  )
}

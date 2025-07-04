"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, Menu } from "lucide-react"
import type { Module } from "@/types"

interface HeaderProps {
  modules: Module[]
  activeModule: string
  setSidebarOpen: (open: boolean) => void
  setShowSettings: (show: boolean) => void
}

export function Header({ modules, activeModule, setSidebarOpen, setShowSettings }: HeaderProps) {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden mr-2">
            <Menu className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">
            {modules.find((m) => m.id === activeModule)?.name || "Dashboard"}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            M
          </div>
        </div>
      </div>
    </header>
  )
}

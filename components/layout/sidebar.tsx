"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import type { Module } from "@/types"

interface SidebarProps {
  modules: Module[]
  activeModule: string
  setActiveModule: (module: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ modules, activeModule, setActiveModule, sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <div
      className={`bg-card shadow-lg transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } lg:w-64 border-r border-border`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <h1 className="font-bold text-2xl text-blue-600">MIFER</h1>
            <p className="text-sm text-muted-foreground">Transporte de Carga</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="mt-8">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-accent transition-colors ${
                activeModule === module.id
                  ? "bg-blue-50 border-r-2 border-blue-500 text-blue-600 dark:bg-blue-900/20"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>{module.name}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

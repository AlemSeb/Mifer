"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings, Sun, Moon, Monitor, Check } from "lucide-react"

interface SettingsModalProps {
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  theme: string
  setTheme: (theme: string) => void
}

export function SettingsModal({ showSettings, setShowSettings, theme, setTheme }: SettingsModalProps) {
  return (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración del Sistema
          </DialogTitle>
          <DialogDescription>Personaliza la apariencia y configuración de MIFER</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sección de Tema */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Apariencia</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900/20"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="text-xs font-medium">Claro</span>
                {theme === "light" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900/20"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-xs font-medium">Oscuro</span>
                {theme === "dark" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setTheme("system")}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  theme === "system"
                    ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900/20"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-white to-gray-800 border-2 border-gray-400 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-xs font-medium">Sistema</span>
                {theme === "system" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sección de Notificaciones */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Notificaciones</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Alertas de Mantenimiento</label>
                  <p className="text-xs text-muted-foreground">Recibir notificaciones de vehículos</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Envíos Completados</label>
                  <p className="text-xs text-muted-foreground">Notificar cuando se complete un envío</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Facturas Pendientes</label>
                  <p className="text-xs text-muted-foreground">Recordatorios de facturación</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>

          {/* Sección de Sistema */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Sistema</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <span className="text-sm">Versión del Sistema</span>
                <span className="text-sm font-mono text-muted-foreground">v2.1.0</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                <span className="text-sm">Última Actualización</span>
                <span className="text-sm text-muted-foreground">15 Ene 2024</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowSettings(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setShowSettings(false)}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

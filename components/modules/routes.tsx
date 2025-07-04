"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SearchFilter } from "@/components/ui/search-filter"
import { Plus, MapPin, Clock, Fuel, DollarSign, RouteIcon, Navigation, Timer, Gauge, Eye, Edit } from "lucide-react"
import { useTableFilters } from "@/hooks/useTableFilters"

// Mock data para rutas
const mockRoutes = [
  {
    id: 1,
    nombre: "Lima - Arequipa",
    origen: "Lima",
    destino: "Arequipa",
    distancia: 1009,
    tiempoEstimado: "12-14 horas",
    costoPorKm: 2.45,
    consumoCombustible: 3.2,
    peajes: 85.5,
    estado: "Activa",
    viajesRealizados: 45,
    dificultad: "Media",
    observaciones: "Ruta principal, buen estado de carretera",
  },
  {
    id: 2,
    nombre: "Lima - Trujillo",
    origen: "Lima",
    destino: "Trujillo",
    distancia: 561,
    tiempoEstimado: "7-8 horas",
    costoPorKm: 2.2,
    consumoCombustible: 3.5,
    peajes: 45.0,
    estado: "Activa",
    viajesRealizados: 67,
    dificultad: "Baja",
    observaciones: "Panamericana Norte, excelente estado",
  },
  {
    id: 3,
    nombre: "Cusco - Lima",
    origen: "Cusco",
    destino: "Lima",
    distancia: 1165,
    tiempoEstimado: "15-17 horas",
    costoPorKm: 2.8,
    consumoCombustible: 2.8,
    peajes: 95.0,
    estado: "Activa",
    viajesRealizados: 23,
    dificultad: "Alta",
    observaciones: "Ruta de montaña, requiere conductor experimentado",
  },
  {
    id: 4,
    nombre: "Lima - Ica",
    origen: "Lima",
    destino: "Ica",
    distancia: 303,
    tiempoEstimado: "4-5 horas",
    costoPorKm: 2.1,
    consumoCombustible: 3.8,
    peajes: 25.5,
    estado: "Activa",
    viajesRealizados: 89,
    dificultad: "Baja",
    observaciones: "Panamericana Sur, ruta rápida",
  },
  {
    id: 5,
    nombre: "Arequipa - Tacna",
    origen: "Arequipa",
    destino: "Tacna",
    distancia: 320,
    tiempoEstimado: "4-5 horas",
    costoPorKm: 2.35,
    consumoCombustible: 3.4,
    peajes: 15.0,
    estado: "Mantenimiento",
    viajesRealizados: 34,
    dificultad: "Media",
    observaciones: "En mantenimiento por obras en carretera",
  },
]

export function RoutesModule() {
  const {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  } = useTableFilters({
    data: mockRoutes,
    searchFields: ["nombre", "origen", "destino", "observaciones"],
    filterFields: [
      {
        key: "estado",
        options: [
          { value: "Activa", label: "Activa" },
          { value: "Mantenimiento", label: "Mantenimiento" },
          { value: "Inactiva", label: "Inactiva" },
        ],
      },
      {
        key: "dificultad",
        options: [
          { value: "Baja", label: "Baja" },
          { value: "Media", label: "Media" },
          { value: "Alta", label: "Alta" },
        ],
      },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Inactiva":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Baja":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Media":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Alta":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Rutas</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Ruta</DialogTitle>
              <DialogDescription>Define una nueva ruta de transporte</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre Ruta
                </Label>
                <Input id="nombre" className="col-span-3" placeholder="Lima - Arequipa" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="origen" className="text-right">
                    Origen
                  </Label>
                  <Input id="origen" className="col-span-3" placeholder="Lima" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destino" className="text-right">
                    Destino
                  </Label>
                  <Input id="destino" className="col-span-3" placeholder="Arequipa" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="distancia" className="text-right">
                    Distancia (km)
                  </Label>
                  <Input id="distancia" type="number" className="col-span-3" placeholder="1009" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tiempo" className="text-right">
                    Tiempo Est.
                  </Label>
                  <Input id="tiempo" className="col-span-3" placeholder="12-14 horas" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="costoPorKm" className="text-right">
                    Costo/Km
                  </Label>
                  <Input id="costoPorKm" type="number" step="0.01" className="col-span-3" placeholder="2.45" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="peajes" className="text-right">
                    Peajes (S/)
                  </Label>
                  <Input id="peajes" type="number" step="0.01" className="col-span-3" placeholder="85.50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="consumo" className="text-right">
                    Consumo km/gal
                  </Label>
                  <Input id="consumo" type="number" step="0.1" className="col-span-3" placeholder="3.2" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dificultad" className="text-right">
                    Dificultad
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Nivel de dificultad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="observaciones" className="text-right">
                  Observaciones
                </Label>
                <Textarea id="observaciones" className="col-span-3" placeholder="Notas importantes sobre la ruta..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Ruta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas de Rutas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rutas</CardTitle>
            <RouteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoutes.length}</div>
            <p className="text-xs text-muted-foreground">Corredores definidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rutas Activas</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoutes.filter((r) => r.estado === "Activa").length}</div>
            <p className="text-xs text-muted-foreground">Operativas actualmente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distancia Total</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRoutes.reduce((sum, r) => sum + r.distancia, 0).toLocaleString()} km
            </div>
            <p className="text-xs text-muted-foreground">Red de cobertura</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viajes Realizados</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoutes.reduce((sum, r) => sum + r.viajesRealizados, 0)}</div>
            <p className="text-xs text-muted-foreground">Total histórico</p>
          </CardContent>
        </Card>
      </div>

      {/* Rutas Principales */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rutas Más Utilizadas</CardTitle>
            <CardDescription>Top 3 corredores por frecuencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRoutes
                .sort((a, b) => b.viajesRealizados - a.viajesRealizados)
                .slice(0, 3)
                .map((route, index) => (
                  <div key={route.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-300">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{route.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {route.distancia} km • {route.tiempoEstimado}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{route.viajesRealizados}</p>
                      <p className="text-xs text-muted-foreground">viajes</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas Operativas</CardTitle>
            <CardDescription>Rendimiento general de rutas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Costo Promedio por Km</span>
                <span className="font-bold">
                  S/ {(mockRoutes.reduce((sum, r) => sum + r.costoPorKm, 0) / mockRoutes.length).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Consumo Promedio</span>
                <span className="font-bold">
                  {(mockRoutes.reduce((sum, r) => sum + r.consumoCombustible, 0) / mockRoutes.length).toFixed(1)} km/gal
                </span>
              </div>
              <div className="flex justify-between">
                <span>Peajes Promedio</span>
                <span className="font-bold">
                  S/ {(mockRoutes.reduce((sum, r) => sum + r.peajes, 0) / mockRoutes.length).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Distancia Promedio</span>
                <span className="font-bold">
                  {Math.round(mockRoutes.reduce((sum, r) => sum + r.distancia, 0) / mockRoutes.length)} km
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Rutas */}
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Rutas</CardTitle>
          <CardDescription>
            Todas las rutas disponibles en MIFER - {filteredData.length} de {mockRoutes.length} rutas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchPlaceholder="Buscar por nombre, origen, destino..."
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ruta</TableHead>
                <TableHead>Distancia</TableHead>
                <TableHead>Tiempo Estimado</TableHead>
                <TableHead>Costos</TableHead>
                <TableHead>Consumo</TableHead>
                <TableHead>Viajes</TableHead>
                <TableHead>Dificultad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No se encontraron rutas que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{route.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {route.origen} → {route.destino}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {route.distancia} km
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {route.tiempoEstimado}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-3 w-3" />
                          S/ {route.costoPorKm}/km
                        </div>
                        <div className="text-xs text-muted-foreground">Peajes: S/ {route.peajes}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        {route.consumoCombustible} km/gal
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-bold">{route.viajesRealizados}</div>
                        <div className="text-xs text-muted-foreground">realizados</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(route.dificultad)}>{route.dificultad}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(route.estado)}>{route.estado}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

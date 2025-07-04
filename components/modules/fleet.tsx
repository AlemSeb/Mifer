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
import { SearchFilter } from "@/components/ui/search-filter"
import { Plus } from "lucide-react"
import { mockVehicles } from "@/data/mockData"
import { getStatusColor } from "@/lib/utils"
import { useTableFilters } from "@/hooks/useTableFilters"

export function FleetModule() {
  const {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  } = useTableFilters({
    data: mockVehicles,
    searchFields: ["placa", "marca", "modelo", "conductor", "ubicacion"],
    filterFields: [
      {
        key: "estado",
        options: [
          { value: "Disponible", label: "Disponible" },
          { value: "En Ruta", label: "En Ruta" },
          { value: "Mantenimiento", label: "Mantenimiento" },
          { value: "Fuera de Servicio", label: "Fuera de Servicio" },
        ],
      },
      {
        key: "tipo",
        options: [
          { value: "Camión", label: "Camión" },
          { value: "Trailer", label: "Trailer" },
          { value: "Furgón", label: "Furgón" },
        ],
      },
      {
        key: "marca",
        options: [
          { value: "Volvo", label: "Volvo" },
          { value: "Scania", label: "Scania" },
          { value: "Mercedes", label: "Mercedes" },
          { value: "Freightliner", label: "Freightliner" },
        ],
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Flota</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Vehículo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Vehículo</DialogTitle>
              <DialogDescription>Ingresa los datos del vehículo</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="placa" className="text-right">
                  Placa
                </Label>
                <Input id="placa" className="col-span-3" placeholder="ABC-123" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camion">Camión</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="furgon">Furgón</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="marca" className="text-right">
                  Marca
                </Label>
                <Input id="marca" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacidad" className="text-right">
                  Capacidad
                </Label>
                <Input id="capacidad" className="col-span-3" placeholder="40 Ton" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Vehículo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flota de Vehículos</CardTitle>
          <CardDescription>
            Gestiona todos los vehículos de MIFER - {filteredData.length} de {mockVehicles.length} vehículos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchPlaceholder="Buscar por placa, marca, conductor..."
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
                <TableHead>Placa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Conductor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No se encontraron vehículos que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.placa}</TableCell>
                    <TableCell>{vehicle.tipo}</TableCell>
                    <TableCell>
                      {vehicle.marca} {vehicle.modelo}
                    </TableCell>
                    <TableCell>{vehicle.capacidad}</TableCell>
                    <TableCell>{vehicle.conductor}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vehicle.estado)}>{vehicle.estado}</Badge>
                    </TableCell>
                    <TableCell>{vehicle.ubicacion}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
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

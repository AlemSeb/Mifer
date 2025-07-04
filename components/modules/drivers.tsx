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
import { Plus, Eye, Edit, Phone, Mail, Calendar, Award } from "lucide-react"
import { mockDrivers, mockVehicles } from "@/data/mockData"
import { getStatusColor } from "@/lib/utils"
import { useTableFilters } from "@/hooks/useTableFilters"

export function DriversModule() {
  const {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  } = useTableFilters({
    data: mockDrivers,
    searchFields: ["nombre", "dni", "licencia", "telefono", "email", "vehiculoAsignado"],
    filterFields: [
      {
        key: "estado",
        options: [
          { value: "Activo", label: "Activo" },
          { value: "En Ruta", label: "En Ruta" },
          { value: "Descanso", label: "Descanso" },
          { value: "Inactivo", label: "Inactivo" },
        ],
      },
      {
        key: "licencia",
        options: [
          { value: "A-I", label: "A-I (Motocicletas)" },
          { value: "A-IIa", label: "A-IIa (Automóviles)" },
          { value: "A-IIb", label: "A-IIb (Camionetas)" },
          { value: "A-IIIa", label: "A-IIIa (Camiones)" },
          { value: "A-IIIb", label: "A-IIIb (Camiones pesados)" },
          { value: "A-IIIc", label: "A-IIIc (Remolcadores)" },
        ],
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Conductores</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Conductor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Conductor</DialogTitle>
              <DialogDescription>Ingresa los datos del conductor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre Completo
                </Label>
                <Input id="nombre" className="col-span-3" placeholder="Juan Pérez Rodríguez" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dni" className="text-right">
                  DNI
                </Label>
                <Input id="dni" className="col-span-3" placeholder="12345678" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="licencia" className="text-right">
                  Licencia
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Tipo de licencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A-I">A-I (Motocicletas)</SelectItem>
                    <SelectItem value="A-IIa">A-IIa (Automóviles)</SelectItem>
                    <SelectItem value="A-IIb">A-IIb (Camionetas)</SelectItem>
                    <SelectItem value="A-IIIa">A-IIIa (Camiones)</SelectItem>
                    <SelectItem value="A-IIIb">A-IIIb (Camiones pesados)</SelectItem>
                    <SelectItem value="A-IIIc">A-IIIc (Remolcadores)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input id="telefono" className="col-span-3" placeholder="+51 987654321" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" placeholder="conductor@mifer.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaIngreso" className="text-right">
                  Fecha Ingreso
                </Label>
                <Input id="fechaIngreso" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vehiculo" className="text-right">
                  Vehículo Asignado
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Asignar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVehicles
                      .filter((v) => v.estado === "Disponible")
                      .map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.placa}>
                          {vehicle.placa} - {vehicle.marca} {vehicle.modelo}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Conductor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas de Conductores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conductores</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDrivers.length}</div>
            <p className="text-xs text-muted-foreground">Personal activo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Ruta</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDrivers.filter((d) => d.estado === "En Ruta").length}</div>
            <p className="text-xs text-muted-foreground">Conductores trabajando</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Viajes</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockDrivers.reduce((sum, d) => sum + d.viajesRealizados, 0) / mockDrivers.length)}
            </div>
            <p className="text-xs text-muted-foreground">Viajes por conductor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDrivers.filter((d) => d.estado === "Activo" || d.estado === "Descanso").length}
            </div>
            <p className="text-xs text-muted-foreground">Para asignación</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Conductores</CardTitle>
          <CardDescription>
            Personal de conducción de MIFER - {filteredData.length} de {mockDrivers.length} conductores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchPlaceholder="Buscar por nombre, DNI, licencia, teléfono..."
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
                <TableHead>Conductor</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Licencia</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Vehículo Asignado</TableHead>
                <TableHead>Viajes Realizados</TableHead>
                <TableHead>Fecha Ingreso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No se encontraron conductores que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{driver.nombre}</p>
                        <p className="text-sm text-muted-foreground">{driver.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{driver.dni}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{driver.licencia}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {driver.telefono}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {driver.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{driver.vehiculoAsignado}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-bold">{driver.viajesRealizados}</div>
                        <div className="text-xs text-muted-foreground">viajes</div>
                      </div>
                    </TableCell>
                    <TableCell>{driver.fechaIngreso}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(driver.estado)}>{driver.estado}</Badge>
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

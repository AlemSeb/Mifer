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
import { mockShipments, mockClients, mockVehicles } from "@/data/mockData"
import { getStatusColor } from "@/lib/utils"
import { useTableFilters } from "@/hooks/useTableFilters"

export function ShipmentsModule() {
  const {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  } = useTableFilters({
    data: mockShipments,
    searchFields: ["id", "cliente", "origen", "destino", "carga", "vehiculo", "conductor"],
    filterFields: [
      {
        key: "estado",
        options: [
          { value: "Entregado", label: "Entregado" },
          { value: "En Tránsito", label: "En Tránsito" },
          { value: "Programado", label: "Programado" },
          { value: "Cancelado", label: "Cancelado" },
        ],
      },
      {
        key: "estadoFacturacion",
        options: [
          { value: "Pendiente", label: "Pendiente" },
          { value: "Facturado", label: "Facturado" },
        ],
      },
      {
        key: "cliente",
        options: mockClients.map((client) => ({
          value: client.razonSocial,
          label: client.razonSocial,
        })),
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Envíos</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Envío
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Envío</DialogTitle>
              <DialogDescription>Programa un nuevo servicio de transporte</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.razonSocial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="origen" className="text-right">
                  Origen
                </Label>
                <Input id="origen" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="destino" className="text-right">
                  Destino
                </Label>
                <Input id="destino" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carga" className="text-right">
                  Tipo de Carga
                </Label>
                <Input id="carga" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="peso" className="text-right">
                  Peso
                </Label>
                <Input id="peso" className="col-span-3" placeholder="25 Ton" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vehiculo" className="text-right">
                  Vehículo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Asignar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVehicles
                      .filter((v) => v.estado === "Disponible")
                      .map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                          {vehicle.placa} - {vehicle.marca}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaSalida" className="text-right">
                  Fecha Salida
                </Label>
                <Input id="fechaSalida" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaEntrega" className="text-right">
                  Fecha Entrega
                </Label>
                <Input id="fechaEntrega" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Programar Envío</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Envíos</CardTitle>
          <CardDescription>
            Todos los servicios de transporte - {filteredData.length} de {mockShipments.length} envíos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchPlaceholder="Buscar por ID, cliente, origen, destino..."
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
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Carga</TableHead>
                <TableHead>Vehículo</TableHead>
                <TableHead>Conductor</TableHead>
                <TableHead>Fecha Salida</TableHead>
                <TableHead>Fecha Entrega</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                    No se encontraron envíos que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.cliente}</TableCell>
                    <TableCell>
                      {shipment.origen} → {shipment.destino}
                    </TableCell>
                    <TableCell>
                      {shipment.carga} ({shipment.peso})
                    </TableCell>
                    <TableCell>{shipment.vehiculo}</TableCell>
                    <TableCell>{shipment.conductor}</TableCell>
                    <TableCell>{shipment.fechaSalida}</TableCell>
                    <TableCell>{shipment.fechaEntrega}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(shipment.estado)}>{shipment.estado}</Badge>
                    </TableCell>
                    <TableCell>S/ {shipment.valor.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Seguir
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

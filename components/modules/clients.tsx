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
import { Plus, Building2, DollarSign, Users, TrendingUp, Eye, Edit, Phone, Mail, MapPin } from "lucide-react"
import { mockClients } from "@/data/mockData"
import { getStatusColor } from "@/lib/utils"
import { useTableFilters } from "@/hooks/useTableFilters"

export function ClientsModule() {
  const {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  } = useTableFilters({
    data: mockClients,
    searchFields: ["razonSocial", "ruc", "contacto", "telefono", "email", "direccion"],
    filterFields: [
      {
        key: "estado",
        options: [
          { value: "Activo", label: "Activo" },
          { value: "Inactivo", label: "Inactivo" },
          { value: "Suspendido", label: "Suspendido" },
        ],
      },
      {
        key: "tipoCliente",
        options: [
          { value: "Corporativo", label: "Corporativo" },
          { value: "PYME", label: "PYME" },
          { value: "Startup", label: "Startup" },
          { value: "Gobierno", label: "Gobierno" },
        ],
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
              <DialogDescription>Ingresa los datos del cliente empresarial</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="razonSocial" className="text-right">
                  Razón Social
                </Label>
                <Input id="razonSocial" className="col-span-3" placeholder="Empresa SAC" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ruc" className="text-right">
                  RUC
                </Label>
                <Input id="ruc" className="col-span-3" placeholder="20123456789" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipoCliente" className="text-right">
                  Tipo Cliente
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporativo">Corporativo</SelectItem>
                    <SelectItem value="pyme">PYME</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="gobierno">Gobierno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contacto" className="text-right">
                  Persona Contacto
                </Label>
                <Input id="contacto" className="col-span-3" placeholder="Juan Pérez" />
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
                <Input id="email" type="email" className="col-span-3" placeholder="contacto@empresa.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="direccion" className="text-right">
                  Dirección
                </Label>
                <Textarea id="direccion" className="col-span-3" placeholder="Av. Principal 123, Lima" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sector" className="text-right">
                  Sector
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sector empresarial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mineria">Minería</SelectItem>
                    <SelectItem value="construccion">Construcción</SelectItem>
                    <SelectItem value="agricultura">Agricultura</SelectItem>
                    <SelectItem value="manufactura">Manufactura</SelectItem>
                    <SelectItem value="comercio">Comercio</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Cliente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas de Clientes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
            <p className="text-xs text-muted-foreground">Empresas registradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.filter((c) => c.estado === "Activo").length}</div>
            <p className="text-xs text-muted-foreground">Con servicios vigentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturación Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              S/ {mockClients.reduce((sum, c) => sum + c.facturacionMensual, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Mensual proyectada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Facturación</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              S/{" "}
              {Math.round(
                mockClients.reduce((sum, c) => sum + c.facturacionMensual, 0) / mockClients.length,
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Por cliente</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cartera de Clientes</CardTitle>
          <CardDescription>
            Empresas que confían en MIFER - {filteredData.length} de {mockClients.length} clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilter
            searchPlaceholder="Buscar por razón social, RUC, contacto..."
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
                <TableHead>Empresa</TableHead>
                <TableHead>RUC</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Información</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Facturación Mensual</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No se encontraron clientes que coincidan con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.razonSocial}</p>
                        <p className="text-sm text-muted-foreground">RUC: {client.ruc}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.ruc}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.contacto}</p>
                        <div className="flex flex-col gap-1 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {client.telefono}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{client.direccion}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.tipoCliente === "Corporativo" ? "default" : "secondary"}>
                        {client.tipoCliente}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <div className="font-bold text-green-600">S/ {client.facturacionMensual.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">mensual</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.estado)}>{client.estado}</Badge>
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

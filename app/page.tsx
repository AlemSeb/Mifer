"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  BarChart3,
  Truck,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Settings,
  Bell,
  Menu,
  X,
  MapPin,
  Clock,
  Fuel,
  User,
  Route,
  Calendar,
  FileText,
  Eye,
  Download,
  Check,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"

// Mock data para empresa de transporte
const mockVehicles = [
  {
    id: 1,
    placa: "ABC-123",
    tipo: "Camión",
    marca: "Volvo",
    modelo: "FH16",
    año: 2020,
    capacidad: "40 Ton",
    estado: "Disponible",
    conductor: "Juan Pérez",
    ubicacion: "Lima",
    mantenimiento: "2024-02-15",
  },
  {
    id: 2,
    placa: "DEF-456",
    tipo: "Trailer",
    marca: "Scania",
    modelo: "R450",
    año: 2019,
    capacidad: "60 Ton",
    estado: "En Ruta",
    conductor: "María García",
    ubicacion: "Arequipa",
    mantenimiento: "2024-01-20",
  },
  {
    id: 3,
    placa: "GHI-789",
    tipo: "Camión",
    marca: "Mercedes",
    modelo: "Actros",
    año: 2021,
    capacidad: "35 Ton",
    estado: "Mantenimiento",
    conductor: "Carlos López",
    ubicacion: "Taller Central",
    mantenimiento: "2024-01-10",
  },
]

const mockShipments = [
  {
    id: "ENV-001",
    cliente: "Minera del Sur SAC",
    clienteId: 1,
    origen: "Lima",
    destino: "Arequipa",
    carga: "Maquinaria Industrial",
    peso: "25 Ton",
    vehiculo: "ABC-123",
    conductor: "Juan Pérez",
    fechaSalida: "2024-01-15",
    fechaEntrega: "2024-01-17",
    estado: "Entregado",
    estadoFacturacion: "Pendiente",
    valor: 8500.0,
  },
  {
    id: "ENV-002",
    cliente: "Constructora Norte EIRL",
    clienteId: 2,
    origen: "Trujillo",
    destino: "Chiclayo",
    carga: "Materiales de Construcción",
    peso: "18 Ton",
    vehiculo: "DEF-456",
    conductor: "María García",
    fechaSalida: "2024-01-14",
    fechaEntrega: "2024-01-15",
    estado: "Entregado",
    estadoFacturacion: "Facturado",
    valor: 3200.0,
  },
  {
    id: "ENV-003",
    cliente: "Agroindustrial Pacífico SA",
    clienteId: 3,
    origen: "Ica",
    destino: "Lima",
    carga: "Productos Agrícolas",
    peso: "30 Ton",
    vehiculo: "GHI-789",
    conductor: "Carlos López",
    fechaSalida: "2024-01-16",
    fechaEntrega: "2024-01-17",
    estado: "Entregado",
    estadoFacturacion: "Pendiente",
    valor: 4800.0,
  },
  {
    id: "ENV-004",
    cliente: "Minera del Sur SAC",
    clienteId: 1,
    origen: "Cusco",
    destino: "Lima",
    carga: "Equipos Mineros",
    peso: "40 Ton",
    vehiculo: "ABC-123",
    conductor: "Juan Pérez",
    fechaSalida: "2024-01-18",
    fechaEntrega: "2024-01-20",
    estado: "Entregado",
    estadoFacturacion: "Pendiente",
    valor: 12000.0,
  },
  {
    id: "ENV-005",
    cliente: "Agroindustrial Pacífico SA",
    clienteId: 3,
    origen: "Lima",
    destino: "Ica",
    carga: "Insumos Agrícolas",
    peso: "22 Ton",
    vehiculo: "DEF-456",
    conductor: "María García",
    fechaSalida: "2024-01-19",
    fechaEntrega: "2024-01-20",
    estado: "Entregado",
    estadoFacturacion: "Pendiente",
    valor: 3800.0,
  },
]

const mockDrivers = [
  {
    id: 1,
    nombre: "Juan Pérez Rodríguez",
    dni: "12345678",
    licencia: "A-IIIb",
    telefono: "+51 987654321",
    email: "juan.perez@mifer.com",
    fechaIngreso: "2020-03-15",
    estado: "Activo",
    vehiculoAsignado: "ABC-123",
    viajesRealizados: 145,
  },
  {
    id: 2,
    nombre: "María García Flores",
    dni: "87654321",
    licencia: "A-IIIb",
    telefono: "+51 987654322",
    email: "maria.garcia@mifer.com",
    fechaIngreso: "2019-07-20",
    estado: "En Ruta",
    vehiculoAsignado: "DEF-456",
    viajesRealizados: 203,
  },
  {
    id: 3,
    nombre: "Carlos López Mendoza",
    dni: "11223344",
    licencia: "A-IIIb",
    telefono: "+51 987654323",
    email: "carlos.lopez@mifer.com",
    fechaIngreso: "2021-01-10",
    estado: "Descanso",
    vehiculoAsignado: "GHI-789",
    viajesRealizados: 89,
  },
]

const mockClients = [
  {
    id: 1,
    razonSocial: "Minera del Sur SAC",
    ruc: "20123456789",
    contacto: "Ana Martínez",
    telefono: "+51 987111222",
    email: "contacto@minerasur.com",
    direccion: "Av. Industrial 123, Lima",
    tipoCliente: "Corporativo",
    estado: "Activo",
    facturacionMensual: 45000.0,
  },
  {
    id: 2,
    razonSocial: "Constructora Norte EIRL",
    ruc: "20987654321",
    contacto: "Roberto Silva",
    telefono: "+51 987333444",
    email: "ventas@constructoranorte.com",
    direccion: "Jr. Los Constructores 456, Trujillo",
    tipoCliente: "PYME",
    estado: "Activo",
    facturacionMensual: 18000.0,
  },
  {
    id: 3,
    razonSocial: "Agroindustrial Pacífico SA",
    ruc: "20555666777",
    contacto: "Carmen Vega",
    telefono: "+51 987555666",
    email: "logistica@agropacífico.com",
    direccion: "Panamericana Sur Km 300, Ica",
    tipoCliente: "Corporativo",
    estado: "Activo",
    facturacionMensual: 32000.0,
  },
]

const mockInvoices = [
  {
    id: 1,
    numero: "F001-00001",
    cliente: "Constructora Norte EIRL",
    clienteId: 2,
    ruc: "20987654321",
    fecha: "2024-01-20",
    envios: ["ENV-002"],
    subtotal: 3200.0,
    igv: 576.0,
    total: 3776.0,
    estado: "Emitida",
  },
  {
    id: 2,
    numero: "F001-00002",
    cliente: "Minera del Sur SAC",
    clienteId: 1,
    ruc: "20123456789",
    fecha: "2024-01-22",
    envios: ["ENV-001", "ENV-004"],
    subtotal: 20500.0,
    igv: 3690.0,
    total: 24190.0,
    estado: "Emitida",
  },
]

export default function MiferERP() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  // Efecto para manejar el tema
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else if (newTheme === "light") {
      root.classList.remove("dark")
    } else if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      if (systemTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const modules = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "fleet", name: "Flota", icon: Truck },
    { id: "shipments", name: "Envíos", icon: Package },
    { id: "drivers", name: "Conductores", icon: User },
    { id: "clients", name: "Clientes", icon: Users },
    { id: "routes", name: "Rutas", icon: Route },
    { id: "billing", name: "Facturación", icon: FileText },
    { id: "reports", name: "Reportes", icon: TrendingUp },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
      case "Activo":
      case "Entregado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "En Ruta":
      case "En Tránsito":
      case "Programado":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Mantenimiento":
      case "Descanso":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Fuera de Servicio":
      case "Inactivo":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const DashboardModule = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ 125,430</div>
            <p className="text-xs text-muted-foreground">+15.2% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehículos Activos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/30</div>
            <p className="text-xs text-muted-foreground">80% de la flota operativa</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos del Mes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8.1% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Vehículos requieren mantenimiento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Envíos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {mockShipments.slice(0, 3).map((shipment) => (
                <div key={shipment.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {shipment.id} - {shipment.cliente}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shipment.origen} → {shipment.destino}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className={getStatusColor(shipment.estado)}>{shipment.estado}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Vehículos en Mantenimiento</CardTitle>
            <CardDescription>Requieren atención inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVehicles
                .filter((v) => v.estado === "Mantenimiento")
                .map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {vehicle.placa} - {vehicle.marca}
                      </p>
                      <p className="text-sm text-muted-foreground">Próximo: {vehicle.mantenimiento}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const FleetModule = () => (
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
          <CardDescription>Gestiona todos los vehículos de MIFER</CardDescription>
        </CardHeader>
        <CardContent>
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
              {mockVehicles.map((vehicle) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const ShipmentsModule = () => (
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
          <CardDescription>Todos los servicios de transporte</CardDescription>
        </CardHeader>
        <CardContent>
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
              {mockShipments.map((shipment) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const DriversModule = () => (
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Conductor</DialogTitle>
              <DialogDescription>Ingresa los datos del conductor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input id="nombre" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dni" className="text-right">
                  DNI
                </Label>
                <Input id="dni" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="licencia" className="text-right">
                  Licencia
                </Label>
                <Input id="licencia" className="col-span-3" placeholder="A-IIIb" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input id="telefono" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Conductor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Conductores</CardTitle>
          <CardDescription>Personal de conducción de MIFER</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Licencia</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Vehículo Asignado</TableHead>
                <TableHead>Viajes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.nombre}</TableCell>
                  <TableCell>{driver.dni}</TableCell>
                  <TableCell>{driver.licencia}</TableCell>
                  <TableCell>{driver.telefono}</TableCell>
                  <TableCell>{driver.vehiculoAsignado}</TableCell>
                  <TableCell>{driver.viajesRealizados}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(driver.estado)}>{driver.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const ClientsModule = () => (
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
              <DialogDescription>Ingresa los datos del cliente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="razonSocial" className="text-right">
                  Razón Social
                </Label>
                <Input id="razonSocial" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ruc" className="text-right">
                  RUC
                </Label>
                <Input id="ruc" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contacto" className="text-right">
                  Contacto
                </Label>
                <Input id="contacto" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Cliente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cartera de Clientes</CardTitle>
          <CardDescription>Empresas que confían en MIFER</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Razón Social</TableHead>
                <TableHead>RUC</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Facturación Mensual</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.razonSocial}</TableCell>
                  <TableCell>{client.ruc}</TableCell>
                  <TableCell>{client.contacto}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>{client.tipoCliente}</TableCell>
                  <TableCell>S/ {client.facturacionMensual.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.estado)}>{client.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const RoutesModule = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Gestión de Rutas</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rutas Principales</CardTitle>
            <CardDescription>Corredores más utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Lima - Arequipa</p>
                  <p className="text-sm text-muted-foreground">1,009 km • 12-14 horas</p>
                </div>
                <Badge>Activa</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Lima - Trujillo</p>
                  <p className="text-sm text-muted-foreground">561 km • 7-8 horas</p>
                </div>
                <Badge>Activa</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Cusco - Lima</p>
                  <p className="text-sm text-muted-foreground">1,165 km • 15-17 horas</p>
                </div>
                <Badge>Activa</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Rutas</CardTitle>
            <CardDescription>Rendimiento por corredor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Viajes Completados (Mes)</span>
                <span className="font-bold">89</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo Promedio de Entrega</span>
                <span className="font-bold">95% puntual</span>
              </div>
              <div className="flex justify-between">
                <span>Consumo Promedio Combustible</span>
                <span className="font-bold">3.2 km/gal</span>
              </div>
              <div className="flex justify-between">
                <span>Costo Promedio por Km</span>
                <span className="font-bold">S/ 2.45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const ReportsModule = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Reportes y Analytics</h2>

      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="operations">Operaciones</TabsTrigger>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="fleet">Flota</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Envíos del Mes</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toneladas Transportadas</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,245</div>
                <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas a Tiempo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Km Recorridos</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,230</div>
                <p className="text-xs text-muted-foreground">+15% vs mes anterior</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ 125,430</div>
                <p className="text-xs text-muted-foreground">+15.2% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos Operativos</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ 78,250</div>
                <p className="text-xs text-muted-foreground">+8.5% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margen de Ganancia</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37.6%</div>
                <p className="text-xs text-muted-foreground">+3.2% vs mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cuentas por Cobrar</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ 23,450</div>
                <p className="text-xs text-muted-foreground">Promedio 15 días</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Flota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Vehículos Operativos</span>
                  <span className="font-bold text-green-600">24/30</span>
                </div>
                <div className="flex justify-between">
                  <span>En Mantenimiento</span>
                  <span className="font-bold text-yellow-600">4</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuera de Servicio</span>
                  <span className="font-bold text-red-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Consumo Promedio Combustible</span>
                  <span className="font-bold">3.2 km/gal</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo Mantenimiento Mensual</span>
                  <span className="font-bold">S/ 12,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const BillingModule = () => {
    const [selectedShipments, setSelectedShipments] = useState<string[]>([])
    const [selectedClient, setSelectedClient] = useState<number | null>(null)
    const [showInvoicePreview, setShowInvoicePreview] = useState(false)
    const [currentInvoice, setCurrentInvoice] = useState<any>(null)

    // Obtener envíos pendientes de facturar agrupados por cliente
    const pendingShipmentsByClient = mockShipments
      .filter((s) => s.estadoFacturacion === "Pendiente" && s.estado === "Entregado")
      .reduce(
        (acc, shipment) => {
          const clientId = shipment.clienteId
          if (!acc[clientId]) {
            acc[clientId] = {
              cliente: shipment.cliente,
              envios: [],
            }
          }
          acc[clientId].envios.push(shipment)
          return acc
        },
        {} as Record<number, { cliente: string; envios: any[] }>,
      )

    const handleSelectShipment = (shipmentId: string, clientId: number) => {
      if (selectedClient && selectedClient !== clientId) {
        // Si se selecciona un envío de otro cliente, cambiar cliente y limpiar selección
        setSelectedClient(clientId)
        setSelectedShipments([shipmentId])
      } else {
        setSelectedClient(clientId)
        setSelectedShipments((prev) =>
          prev.includes(shipmentId) ? prev.filter((id) => id !== shipmentId) : [...prev, shipmentId],
        )
      }
    }

    const generateInvoice = () => {
      if (selectedShipments.length === 0 || !selectedClient) return

      const client = mockClients.find((c) => c.id === selectedClient)
      const shipments = mockShipments.filter((s) => selectedShipments.includes(s.id))
      const subtotal = shipments.reduce((sum, s) => sum + s.valor, 0)
      const igv = subtotal * 0.18
      const total = subtotal + igv

      // Generar número correlativo
      const nextNumber = String(mockInvoices.length + 1).padStart(5, "0")

      const newInvoice = {
        id: mockInvoices.length + 1,
        numero: `F001-${nextNumber}`,
        cliente: client?.razonSocial || "",
        clienteId: selectedClient,
        ruc: client?.ruc || "",
        fecha: new Date().toISOString().split("T")[0],
        envios: selectedShipments,
        subtotal,
        igv,
        total,
        estado: "Emitida",
        shipmentDetails: shipments,
      }

      setCurrentInvoice(newInvoice)
      setShowInvoicePreview(true)
    }

    const confirmInvoice = () => {
      // Aquí se guardaría la factura en la base de datos
      mockInvoices.push(currentInvoice)

      // Actualizar estado de envíos
      selectedShipments.forEach((shipmentId) => {
        const shipment = mockShipments.find((s) => s.id === shipmentId)
        if (shipment) {
          shipment.estadoFacturacion = "Facturado"
        }
      })

      setSelectedShipments([])
      setSelectedClient(null)
      setShowInvoicePreview(false)
      setCurrentInvoice(null)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Facturación</h2>
          <div className="flex gap-2">
            <Button onClick={generateInvoice} disabled={selectedShipments.length === 0}>
              <FileText className="mr-2 h-4 w-4" />
              Generar Factura
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Envíos Pendientes</TabsTrigger>
            <TabsTrigger value="invoices">Facturas Emitidas</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Envíos Pendientes de Facturar</CardTitle>
                <CardDescription>
                  Selecciona los envíos para generar una factura. Solo puedes facturar envíos del mismo cliente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.entries(pendingShipmentsByClient).map(([clientId, data]) => (
                  <div key={clientId} className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">{data.cliente}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                const allShipmentIds = data.envios.map((s) => s.id)
                                if (e.target.checked) {
                                  setSelectedClient(Number.parseInt(clientId))
                                  setSelectedShipments(allShipmentIds)
                                } else if (selectedClient === Number.parseInt(clientId)) {
                                  setSelectedShipments([])
                                  setSelectedClient(null)
                                }
                              }}
                              checked={
                                selectedClient === Number.parseInt(clientId) &&
                                data.envios.every((s) => selectedShipments.includes(s.id))
                              }
                            />
                          </TableHead>
                          <TableHead>ID Envío</TableHead>
                          <TableHead>Ruta</TableHead>
                          <TableHead>Carga</TableHead>
                          <TableHead>Fecha Entrega</TableHead>
                          <TableHead>Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.envios.map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selectedShipments.includes(shipment.id)}
                                onChange={() => handleSelectShipment(shipment.id, Number.parseInt(clientId))}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>
                              {shipment.origen} → {shipment.destino}
                            </TableCell>
                            <TableCell>{shipment.carga}</TableCell>
                            <TableCell>{shipment.fechaEntrega}</TableCell>
                            <TableCell>S/ {shipment.valor.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-2 text-right">
                      <span className="text-sm font-medium">
                        Subtotal: S/ {data.envios.reduce((sum, s) => sum + s.valor, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Facturas Emitidas</CardTitle>
                <CardDescription>Historial de facturas generadas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>RUC</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Envíos</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.numero}</TableCell>
                        <TableCell>{invoice.cliente}</TableCell>
                        <TableCell>{invoice.ruc}</TableCell>
                        <TableCell>{invoice.fecha}</TableCell>
                        <TableCell>{invoice.envios.join(", ")}</TableCell>
                        <TableCell>S/ {invoice.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {invoice.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal de Vista Previa de Factura */}
        <Dialog open={showInvoicePreview} onOpenChange={setShowInvoicePreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Vista Previa de Factura</DialogTitle>
              <DialogDescription>Revisa los datos antes de confirmar la emisión</DialogDescription>
            </DialogHeader>

            {currentInvoice && (
              <div className="space-y-6 p-6 bg-white dark:bg-gray-900">
                {/* Header de la factura */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-blue-600">MIFER</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transporte de Carga</p>
                    <p className="text-sm">RUC: 20123456789</p>
                    <p className="text-sm">Av. Transportes 123, Lima</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold">FACTURA</h2>
                    <p className="text-lg font-semibold">{currentInvoice.numero}</p>
                    <p className="text-sm">Fecha: {currentInvoice.fecha}</p>
                  </div>
                </div>

                {/* Datos del cliente */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">DATOS DEL CLIENTE:</h3>
                  <p>
                    <strong>Razón Social:</strong> {currentInvoice.cliente}
                  </p>
                  <p>
                    <strong>RUC:</strong> {currentInvoice.ruc}
                  </p>
                </div>

                {/* Detalle de servicios */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">DETALLE DE SERVICIOS:</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Precio Unit.</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentInvoice.shipmentDetails?.map((shipment: any) => (
                        <TableRow key={shipment.id}>
                          <TableCell>{shipment.id}</TableCell>
                          <TableCell>Transporte de {shipment.carga}</TableCell>
                          <TableCell>
                            {shipment.origen} - {shipment.destino}
                          </TableCell>
                          <TableCell>{shipment.peso}</TableCell>
                          <TableCell>S/ {shipment.valor.toFixed(2)}</TableCell>
                          <TableCell>S/ {shipment.valor.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totales */}
                <div className="border-t pt-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>S/ {currentInvoice.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IGV (18%):</span>
                        <span>S/ {currentInvoice.igv.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>TOTAL:</span>
                        <span>S/ {currentInvoice.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInvoicePreview(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmInvoice}>
                <Check className="mr-2 h-4 w-4" />
                Confirmar y Emitir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardModule />
      case "fleet":
        return <FleetModule />
      case "shipments":
        return <ShipmentsModule />
      case "drivers":
        return <DriversModule />
      case "clients":
        return <ClientsModule />
      case "routes":
        return <RoutesModule />
      case "billing":
        return <BillingModule />
      case "reports":
        return <ReportsModule />
      default:
        return <DashboardModule />
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-2">
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

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">{renderModule()}</main>
      </div>

      {/* Modal de Configuración */}
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
                  onClick={() => handleThemeChange("light")}
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
                  onClick={() => handleThemeChange("dark")}
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
                  onClick={() => handleThemeChange("system")}
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
    </div>
  )
}

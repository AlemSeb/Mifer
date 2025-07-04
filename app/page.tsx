"use client"

import { useState } from "react"
import { BarChart3, Truck, Package, Users, User, Route, FileText, TrendingUp } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { SettingsModal } from "@/components/layout/settings-modal"
import { DashboardModule } from "@/components/modules/dashboard"
import { FleetModule } from "@/components/modules/fleet"
import { ShipmentsModule } from "@/components/modules/shipments"
import { DriversModule } from "@/components/modules/drivers"
import { ClientsModule } from "@/components/modules/clients"
import { RoutesModule } from "@/components/modules/routes"
import { BillingModule } from "@/components/modules/billing"
import { ReportsModule } from "@/components/modules/reports"
import type { Module } from "@/types"

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
  const [showSettings, setShowSettings] = useState(false)
  const { theme, setTheme, mounted } = useTheme()

  const modules: Module[] = [
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
      <Sidebar
        modules={modules}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          modules={modules}
          activeModule={activeModule}
          setSidebarOpen={setSidebarOpen}
          setShowSettings={setShowSettings}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">{renderModule()}</main>
      </div>

      <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} theme={theme} setTheme={setTheme} />
    </div>
  )
}

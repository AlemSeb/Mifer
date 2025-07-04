"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  Truck,
  DollarSign,
  Clock,
  MapPin,
  Fuel,
  TrendingUp,
  Download,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { mockShipments, mockVehicles, mockDrivers, mockClients } from "@/data/mockData"

export function ReportsModule() {
  // Cálculos para reportes
  const totalShipments = mockShipments.length
  const completedShipments = mockShipments.filter((s) => s.estado === "Entregado").length
  const totalRevenue = mockShipments.reduce((sum, s) => sum + s.valor, 0)
  const averageShipmentValue = totalRevenue / totalShipments
  const onTimeDeliveries = Math.round((completedShipments / totalShipments) * 100)

  const vehicleStats = {
    total: mockVehicles.length,
    active: mockVehicles.filter((v) => v.estado === "Disponible" || v.estado === "En Ruta").length,
    maintenance: mockVehicles.filter((v) => v.estado === "Mantenimiento").length,
    outOfService: mockVehicles.filter((v) => v.estado === "Fuera de Servicio").length,
  }

  const driverStats = {
    total: mockDrivers.length,
    active: mockDrivers.filter((d) => d.estado === "Activo" || d.estado === "En Ruta").length,
    onRoute: mockDrivers.filter((d) => d.estado === "En Ruta").length,
    resting: mockDrivers.filter((d) => d.estado === "Descanso").length,
  }

  // Datos para gráficos (simulados)
  const monthlyData = [
    { month: "Ene", shipments: 45, revenue: 95000 },
    { month: "Feb", shipments: 52, revenue: 108000 },
    { month: "Mar", shipments: 48, revenue: 102000 },
    { month: "Abr", shipments: 61, revenue: 125000 },
    { month: "May", shipments: 58, revenue: 118000 },
    { month: "Jun", shipments: 67, revenue: 135000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reportes y Analytics</h2>
        <div className="flex gap-2">
          <Select defaultValue="mes">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="mes">Este Mes</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="año">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operaciones</TabsTrigger>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="fleet">Flota</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Envíos del Mes</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalShipments}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas Completadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedShipments}</div>
                <p className="text-xs text-muted-foreground">{onTimeDeliveries}% puntualidad</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toneladas Transportadas</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,245</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Km Recorridos</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,230</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Envíos por Estado */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Envíos por Estado</CardTitle>
              <CardDescription>Distribución actual de servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Valor Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Entregado", "En Tránsito", "Programado"].map((estado) => {
                    const shipmentsInState = mockShipments.filter((s) => s.estado === estado)
                    const count = shipmentsInState.length
                    const percentage = ((count / totalShipments) * 100).toFixed(1)
                    const value = shipmentsInState.reduce((sum, s) => sum + s.valor, 0)

                    return (
                      <TableRow key={estado}>
                        <TableCell>
                          <Badge
                            className={
                              estado === "Entregado"
                                ? "bg-green-100 text-green-800"
                                : estado === "En Tránsito"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{count}</TableCell>
                        <TableCell>{percentage}%</TableCell>
                        <TableCell>S/ {value.toLocaleString()}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ {totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15.2%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ {averageShipmentValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Por envío</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos Operativos</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">S/ 78,250</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">+8.5%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margen de Ganancia</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37.6%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.2%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ingresos por Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Top Clientes por Facturación</CardTitle>
              <CardDescription>Principales generadores de ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Envíos</TableHead>
                    <TableHead>Facturación</TableHead>
                    <TableHead>Participación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClients
                    .sort((a, b) => b.facturacionMensual - a.facturacionMensual)
                    .map((client) => {
                      const clientShipments = mockShipments.filter((s) => s.clienteId === client.id)
                      const clientRevenue = clientShipments.reduce((sum, s) => sum + s.valor, 0)
                      const participation = ((clientRevenue / totalRevenue) * 100).toFixed(1)

                      return (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.razonSocial}</TableCell>
                          <TableCell>{clientShipments.length}</TableCell>
                          <TableCell>S/ {clientRevenue.toLocaleString()}</TableCell>
                          <TableCell>{participation}%</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flota Total</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleStats.total}</div>
                <p className="text-xs text-muted-foreground">Vehículos registrados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Operativos</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{vehicleStats.active}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((vehicleStats.active / vehicleStats.total) * 100)}% de la flota
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Mantenimiento</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{vehicleStats.maintenance}</div>
                <p className="text-xs text-muted-foreground">Requieren atención</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fuera de Servicio</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{vehicleStats.outOfService}</div>
                <p className="text-xs text-muted-foreground">No disponibles</p>
              </CardContent>
            </Card>
          </div>

          {/* Estado de Conductores */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estado de la Flota</CardTitle>
                <CardDescription>Distribución por estado operativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Vehículos Operativos</span>
                    <span className="font-bold text-green-600">
                      {vehicleStats.active}/{vehicleStats.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>En Mantenimiento</span>
                    <span className="font-bold text-yellow-600">{vehicleStats.maintenance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fuera de Servicio</span>
                    <span className="font-bold text-red-600">{vehicleStats.outOfService}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Eficiencia Operativa</span>
                    <span className="font-bold">{Math.round((vehicleStats.active / vehicleStats.total) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Conductores</CardTitle>
                <CardDescription>Personal disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Conductores</span>
                    <span className="font-bold">{driverStats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Activos</span>
                    <span className="font-bold text-green-600">{driverStats.active}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>En Ruta</span>
                    <span className="font-bold text-blue-600">{driverStats.onRoute}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>En Descanso</span>
                    <span className="font-bold text-yellow-600">{driverStats.resting}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas a Tiempo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{onTimeDeliveries}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfacción Cliente</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96.5%</div>
                <p className="text-xs text-muted-foreground">Calificación promedio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5h</div>
                <p className="text-xs text-muted-foreground">Por envío</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidencias</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-0.8%</span> vs mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Rendimiento por Conductor */}
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Conductor</CardTitle>
              <CardDescription>Top performers del mes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conductor</TableHead>
                    <TableHead>Viajes Completados</TableHead>
                    <TableHead>Entregas a Tiempo</TableHead>
                    <TableHead>Km Recorridos</TableHead>
                    <TableHead>Calificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDrivers
                    .sort((a, b) => b.viajesRealizados - a.viajesRealizados)
                    .map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.nombre}</TableCell>
                        <TableCell>{driver.viajesRealizados}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{Math.floor(Math.random() * 10) + 90}%</Badge>
                        </TableCell>
                        <TableCell>{(driver.viajesRealizados * 850).toLocaleString()} km</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-bold">{(4.2 + Math.random() * 0.7).toFixed(1)}</span>
                            <span className="text-xs text-muted-foreground">/5.0</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tendencias Mensuales */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Rendimiento</CardTitle>
              <CardDescription>Evolución de métricas clave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Envíos por Mes</h4>
                    <div className="space-y-1">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="flex justify-between text-sm">
                          <span>{data.month}</span>
                          <span className="font-medium">{data.shipments}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Ingresos por Mes</h4>
                    <div className="space-y-1">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="flex justify-between text-sm">
                          <span>{data.month}</span>
                          <span className="font-medium">S/ {(data.revenue / 1000).toFixed(0)}k</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Crecimiento</h4>
                    <div className="space-y-1">
                      {monthlyData.map((data, index) => {
                        const growth =
                          index > 0
                            ? (
                                ((data.shipments - monthlyData[index - 1].shipments) /
                                  monthlyData[index - 1].shipments) *
                                100
                              ).toFixed(1)
                            : "0.0"
                        return (
                          <div key={data.month} className="flex justify-between text-sm">
                            <span>{data.month}</span>
                            <span
                              className={`font-medium ${Number.parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {Number.parseFloat(growth) >= 0 ? "+" : ""}
                              {growth}%
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

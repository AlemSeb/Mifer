"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Truck, Package, AlertTriangle } from "lucide-react"
import { mockShipments, mockVehicles } from "@/data/mockData"
import { getStatusColor } from "@/lib/utils"

export function DashboardModule() {
  return (
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
}

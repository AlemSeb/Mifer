"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import { FileText, Eye, Download, Check } from "lucide-react"
import { mockShipments, mockClients, mockInvoices } from "@/data/mockData"
import type { Invoice } from "@/types"

export function BillingModule() {
  const [selectedShipments, setSelectedShipments] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState<number | null>(null)
  const [showInvoicePreview, setShowInvoicePreview] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

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

    const nextNumber = String(mockInvoices.length + 1).padStart(5, "0")

    const newInvoice: Invoice = {
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
    if (currentInvoice) {
      mockInvoices.push(currentInvoice)
      selectedShipments.forEach((shipmentId) => {
        const shipment = mockShipments.find((s) => s.id === shipmentId)
        if (shipment) {
          shipment.estadoFacturacion = "Facturado"
        }
      })
    }

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

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">DATOS DEL CLIENTE:</h3>
                <p>
                  <strong>Razón Social:</strong> {currentInvoice.cliente}
                </p>
                <p>
                  <strong>RUC:</strong> {currentInvoice.ruc}
                </p>
              </div>

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
                    {currentInvoice.shipmentDetails?.map((shipment) => (
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

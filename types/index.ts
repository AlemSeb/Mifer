export interface Vehicle {
  id: number
  placa: string
  tipo: string
  marca: string
  modelo: string
  año: number
  capacidad: string
  estado: string
  conductor: string
  ubicacion: string
  mantenimiento: string
}

export interface Shipment {
  id: string
  cliente: string
  clienteId: number
  origen: string
  destino: string
  carga: string
  peso: string
  vehiculo: string
  conductor: string
  fechaSalida: string
  fechaEntrega: string
  estado: string
  estadoFacturacion: string
  valor: number
}

export interface Driver {
  id: number
  nombre: string
  dni: string
  licencia: string
  telefono: string
  email: string
  fechaIngreso: string
  estado: string
  vehiculoAsignado: string
  viajesRealizados: number
}

export interface Client {
  id: number
  razonSocial: string
  ruc: string
  contacto: string
  telefono: string
  email: string
  direccion: string
  tipoCliente: string
  estado: string
  facturacionMensual: number
}

export interface Invoice {
  id: number
  numero: string
  cliente: string
  clienteId: number
  ruc: string
  fecha: string
  envios: string[]
  subtotal: number
  igv: number
  total: number
  estado: string
  shipmentDetails?: Shipment[]
}

export interface Module {
  id: string
  name: string
  icon: any
}

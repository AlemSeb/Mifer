import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = (status: string) => {
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

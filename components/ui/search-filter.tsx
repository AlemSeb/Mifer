"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, X } from "lucide-react"

interface FilterOption {
  key: string
  label: string
  options: { value: string; label: string }[]
}

interface SearchFilterProps {
  searchPlaceholder?: string
  searchValue: string
  onSearchChange: (value: string) => void
  filters?: FilterOption[]
  activeFilters: Record<string, string>
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export function SearchFilter({
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  filters = [],
  activeFilters,
  onFilterChange,
  onClearFilters,
}: SearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Buscador */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      {filters.length > 0 && (
        <div className="flex gap-2">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filtros</h4>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onClearFilters()
                        setIsFilterOpen(false)
                      }}
                    >
                      Limpiar todo
                    </Button>
                  )}
                </div>

                {filters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Select
                      value={activeFilters[filter.key] || "Todos"}
                      onValueChange={(value) => onFilterChange(filter.key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Seleccionar ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Mostrar filtros activos */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([key, value]) => {
                if (!value || value === "Todos") return null
                const filter = filters.find((f) => f.key === key)
                const option = filter?.options.find((o) => o.value === value)
                return (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1">
                    {filter?.label}: {option?.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => onFilterChange(key, "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"

interface UseTableFiltersProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  filterFields?: {
    key: keyof T
    options: { value: string; label: string }[]
  }[]
}

export function useTableFilters<T>({ data, searchFields, filterFields = [] }: UseTableFiltersProps<T>) {
  const [searchValue, setSearchValue] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const filteredData = useMemo(() => {
    let filtered = data

    // Aplicar búsqueda
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          return value && String(value).toLowerCase().includes(searchLower)
        }),
      )
    }

    // Aplicar filtros
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => {
          const itemValue = item[key as keyof T]
          return String(itemValue) === value
        })
      }
    })

    return filtered
  }, [data, searchValue, activeFilters, searchFields])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    setSearchValue("")
  }

  const filterOptions = filterFields.map((field) => ({
    key: String(field.key),
    label: String(field.key).charAt(0).toUpperCase() + String(field.key).slice(1),
    options: field.options,
  }))

  return {
    searchValue,
    activeFilters,
    filteredData,
    filterOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
  }
}

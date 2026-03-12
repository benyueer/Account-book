import { useMemo, useState } from 'react'

export interface TransactionFilters {
  type?: string
  counterparty?: string
  tagIds?: string[]
  minAmount?: number
  maxAmount?: number
  startDate?: string
  endDate?: string
}

export interface UseTransactionFilterReturn {
  // State
  startDate: Date | null
  endDate: Date | null
  filterType: string | undefined
  counterparty: string | undefined
  tagIds: string[]
  minAmount: number | undefined
  maxAmount: number | undefined
  // Actions
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setFilterType: (type: string | undefined) => void
  setCounterparty: (counterparty: string | undefined) => void
  setTagIds: (tagIds: string[]) => void
  setMinAmount: (amount: number | undefined) => void
  setMaxAmount: (amount: number | undefined) => void
  handleDateRangeChange: (start?: Date, end?: Date) => void
  handleTypeChange: (type?: string) => void
  handleCounterpartyChange: (counterparty?: string) => void
  handleTagsChange: (tagIds: string[]) => void
  handleAmountRangeChange: (min?: number, max?: number) => void
  reset: () => void
  // Computed
  filters: TransactionFilters
}

export function useTransactionFilter(): UseTransactionFilterReturn {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filterType, setFilterType] = useState<string | undefined>(undefined)
  const [counterparty, setCounterparty] = useState<string | undefined>(
    undefined,
  )
  const [tagIds, setTagIds] = useState<string[]>([])
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined)
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined)

  const filters = useMemo((): TransactionFilters => {
    const params: TransactionFilters = {
      type: filterType,
      counterparty,
      tagIds: tagIds.length > 0 ? tagIds : undefined,
      minAmount,
      maxAmount,
    }
    if (startDate) {
      params.startDate = startDate.toISOString()
    }
    if (endDate) {
      params.endDate = endDate.toISOString()
    }
    return params
  }, [
    startDate,
    endDate,
    filterType,
    counterparty,
    tagIds,
    minAmount,
    maxAmount,
  ])

  const handleDateRangeChange = (start?: Date, end?: Date) => {
    setStartDate(start || null)
    setEndDate(end || null)
  }

  const handleTypeChange = (type?: string) => {
    setFilterType(type)
  }

  const handleCounterpartyChange = (counterparty?: string) => {
    setCounterparty(counterparty)
  }

  const handleTagsChange = (tagIds: string[]) => {
    setTagIds(tagIds)
  }

  const handleAmountRangeChange = (min?: number, max?: number) => {
    setMinAmount(min)
    setMaxAmount(max)
  }

  const reset = () => {
    setStartDate(null)
    setEndDate(null)
    setFilterType(undefined)
    setCounterparty(undefined)
    setTagIds([])
    setMinAmount(undefined)
    setMaxAmount(undefined)
  }

  return {
    // State
    startDate,
    endDate,
    filterType,
    counterparty,
    tagIds,
    minAmount,
    maxAmount,
    // Actions
    setStartDate,
    setEndDate,
    setFilterType,
    setCounterparty,
    setTagIds,
    setMinAmount,
    setMaxAmount,
    handleDateRangeChange,
    handleTypeChange,
    handleCounterpartyChange,
    handleTagsChange,
    handleAmountRangeChange,
    reset,
    // Computed
    filters,
  }
}

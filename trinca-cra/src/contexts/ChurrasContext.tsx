/* eslint-disable prettier/prettier */
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Churras {
  id: number
  description: string
  participants: number
  price: number
  date: string
  createdAt: string
}

interface CreateChurrasInput {
  description: string
  price: number
  date: string
}

interface ChurrasContextType {
  churrasList: Churras[]
  fetchChurrasList: (query?: string) => Promise<void>
  createChurras: (data: CreateChurrasInput) => Promise<void>
}

interface ChurrasProviderProps {
  children: ReactNode
}

export const ChurrasContext = createContext({} as ChurrasContextType)

export function ChurrasProvider({ children }: ChurrasProviderProps) {
  const [churrasList, setChurrasList] = useState<Churras[]>([])

  const fetchChurrasList = useCallback(async (query?: string) => {
    const response = await api.get('churras', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setChurrasList(response.data)
  }, [])

  const createChurras = useCallback(async (data: CreateChurrasInput) => {
    const { description, price, date } = data

    const response = await api.post('churras', {
      description,
      price,
      date,
      createdAt: new Date(),
    })

    setChurrasList((state) => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchChurrasList()
  }, [fetchChurrasList])

  return (
    <ChurrasContext.Provider
      value={{
        churrasList,
        fetchChurrasList,
        createChurras,
      }}
    >
      {children}
    </ChurrasContext.Provider>
  )
}

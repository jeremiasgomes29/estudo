import { useState, useCallback } from 'react'
import { INITIAL_DB } from '../data/database.js'

// Hook para persistir o banco no localStorage
export function useDatabase() {
  const [db, setDbState] = useState(() => {
    try {
      const saved = localStorage.getItem('edumanager_db')
      return saved ? JSON.parse(saved) : INITIAL_DB
    } catch {
      return INITIAL_DB
    }
  })

  const setDb = useCallback((next) => {
    setDbState(next)
    localStorage.setItem('edumanager_db', JSON.stringify(next))
  }, [])

  const resetDb = useCallback(() => {
    setDbState(INITIAL_DB)
    localStorage.setItem('edumanager_db', JSON.stringify(INITIAL_DB))
  }, [])

  return { db, setDb, resetDb }
}

// Gerar próximo ID de uma lista
export const nextId = (arr) =>
  arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1

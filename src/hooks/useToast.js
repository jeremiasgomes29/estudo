import { useState, useCallback } from 'react'

export function useToast() {
  const [toastMsg, setToastMsg] = useState('')

  const toast = useCallback((msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }, [])

  return { toastMsg, toast }
}

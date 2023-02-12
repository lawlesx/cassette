import { useEffect, useMemo, useRef } from 'react'

const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useMemo(() => isMounted.current, [])
}

export default useIsMounted

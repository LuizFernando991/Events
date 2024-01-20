import { useEffect, useState } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQueryList.addEventListener('change', updateMatches)

    // Limpeza do listener ao desmontar o componente
    return () => {
      mediaQueryList.removeEventListener('change', updateMatches)
    }
  }, [query])

  return matches
}

export default useMediaQuery

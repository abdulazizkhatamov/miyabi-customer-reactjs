// src/shared/components/QueryLoader.tsx
import { useEffect } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import NProgress from 'nprogress'

export function QueryLoader() {
  const isFetching = useIsFetching()

  useEffect(() => {
    if (isFetching > 0) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [isFetching])

  return null
}

// TopLoader.tsx
import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import NProgressLib from 'nprogress'
import '@/shared/styles/nprogress.css'

NProgressLib.configure({ showSpinner: false, trickleSpeed: 200 })

export function NProgress() {
  const router = useRouter()

  useEffect(() => {
    const unsubStart = router.subscribe('onBeforeNavigate', () => {
      NProgressLib.start()
    })

    const unsubDone = router.subscribe('onResolved', () => {
      NProgressLib.done()
    })

    return () => {
      unsubStart()
      unsubDone()
    }
  }, [router])

  return null
}

// tanstackRouter.provider.tsx
import { RouterProvider, createRouter } from '@tanstack/react-router'
import LoopIcon from '@mui/icons-material/Loop'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { routeTree } from '@/routeTree.gen'
import { getContext } from '@/app/providers/tanstackQuery.provider'
import { useAuth } from '@/features/auth/hooks/useAuth'

// Single context shared across router + providers
const context = getContext()

const router = createRouter({
  routeTree,
  context: {
    ...context,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function TanstackRouterProvider() {
  const auth = useAuth()

  // Show loader until auth is ready
  if (!auth.isAuthReady) {
    return (
      <LoaderWrapper>
        <LoaderIcon />
      </LoaderWrapper>
    )
  }

  return <RouterProvider router={router} context={{ ...context, auth }} />
}

// Spinner animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const LoaderIcon = styled(LoopIcon)`
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`

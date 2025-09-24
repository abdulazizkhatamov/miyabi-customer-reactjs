import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import { Container } from '@mui/material'
import type { QueryClient } from '@tanstack/react-query'
import type { useAuth } from '@/features/auth/hooks/useAuth'
import Header from '@/shared/components/header'
import Footer from '@/shared/components/footer'

interface MyRouterContext {
  queryClient: QueryClient
  auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
      <Footer />
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})

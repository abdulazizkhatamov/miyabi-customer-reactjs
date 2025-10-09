import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import { Container } from '@mui/material'
import type { QueryClient, UseQueryResult } from '@tanstack/react-query'
import type { Session } from '@/shared/api/auth.api'
import Header from '@/shared/components/header'
import Footer from '@/shared/components/footer'
import { NProgress } from '@/shared/components/nprogress'

export interface MyRouterContext {
  queryClient: QueryClient
  session: UseQueryResult<Session, Error>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NProgress />
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

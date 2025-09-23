import MuiProvider from './mui.provider'
import ReduxStoreProvider from './reduxStore.provider'
import TanstackRouterProvider from './tanstackRouter.provider'

import TanstackQueryProvider, {
  getContext as getTanstackQueryContext,
} from '@/app/providers/tanstackQuery.provider'

const TanStackQueryProviderContext = getTanstackQueryContext()

export default function Providers() {
  return (
    <ReduxStoreProvider>
      <TanstackQueryProvider {...TanStackQueryProviderContext}>
        <MuiProvider>
          <TanstackRouterProvider />
        </MuiProvider>
      </TanstackQueryProvider>
    </ReduxStoreProvider>
  )
}

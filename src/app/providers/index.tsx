import MuiProvider from './mui.provider'
import ReduxStoreProvider from './reduxStore.provider'
import TanstackRouterProvider from './tanstackRouter.provider'
import { QueryLoader } from '@/shared/components/query-loader'

import TanstackQueryProvider, {
  getContext as getTanstackQueryContext,
} from '@/app/providers/tanstackQuery.provider'

const TanStackQueryProviderContext = getTanstackQueryContext()

export default function Providers() {
  return (
    <ReduxStoreProvider>
      <TanstackQueryProvider {...TanStackQueryProviderContext}>
        <QueryLoader />
        <MuiProvider>
          <TanstackRouterProvider />
        </MuiProvider>
      </TanstackQueryProvider>
    </ReduxStoreProvider>
  )
}

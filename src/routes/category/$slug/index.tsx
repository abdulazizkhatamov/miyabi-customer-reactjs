import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/$slug/"!</div>
}

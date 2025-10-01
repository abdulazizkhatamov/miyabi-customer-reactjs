import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/branches/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/branches/"!</div>
}

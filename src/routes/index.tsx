import { createFileRoute } from '@tanstack/react-router'
import Header from '@/shared/components/header'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header />
    </div>
  )
}

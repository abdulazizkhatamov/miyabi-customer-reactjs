import React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { PromotionalBanners } from '@/features/home/components/promotional-banners'
import CategoriesTabs from '@/features/home/components/categories-tabs'

// ✅ prefetch on route load
export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <PromotionalBanners />
      <CategoriesTabs />
    </React.Fragment>
  )
}

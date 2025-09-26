import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { BannersSection } from '@/features/banners/components/banners-section'
import CategoriesTabs from '@/features/home/components/categories-tabs'

// ✅ prefetch on route load
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <BannersSection />
      <CategoriesTabs />
    </React.Fragment>
  )
}

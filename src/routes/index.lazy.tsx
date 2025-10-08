/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Box, CircularProgress, IconButton, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { Product } from '@/shared/schema/product.schema'
import { categoriesQuery } from '@/shared/api/category.api'
import { PromotionalBanners } from '@/features/home/components/promotional-banners'
import ProductCard from '@/shared/components/product-card'
import { productsQuery } from '@/shared/api/product.api'

// ✅ prefetch on route load
export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

// --- Category Section Component ---
function CategorySection({
  category,
  sectionRefs,
}: {
  category: { id: string; name: string }
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
}) {
  const theme = useTheme()
  const [isInViewport, setIsInViewport] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)

  // Intersection Observer to detect when section enters viewport
  React.useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const { data: productsData, isLoading: isProductsLoading } = useInfiniteQuery(
    productsQuery(category.id, isInViewport && !hasLoaded),
  )

  // Mark as loaded once products are fetched
  React.useEffect(() => {
    if (productsData && !hasLoaded) {
      setHasLoaded(true)
    }
  }, [productsData, hasLoaded])

  return (
    <Box
      ref={(el) => {
        ref.current = el as HTMLDivElement | null
        sectionRefs.current[category.id] = el as HTMLDivElement | null
      }}
      data-id={category.id}
      css={{
        padding: '16px 0',
      }}
    >
      <h2>{category.name}</h2>

      {isProductsLoading ? (
        <Box
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '120px',
            width: '100%',
          }}
        >
          <CircularProgress sx={{ color: 'var(--primary-color)' }} />
        </Box>
      ) : (
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // default: mobile (2 columns)
            gap: '16px',
            marginTop: '16px',

            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: 'repeat(3, 1fr)', // tablet
            },
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(4, 1fr)', // desktop
            },
          }}
        >
          {productsData?.pages.flatMap((page) =>
            page.products.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            )),
          )}
          {productsData &&
            productsData.pages.every((page) => page.products.length === 0) && (
              <Box
                css={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  color: '#888',
                  padding: '32px 0',
                }}
              >
                No products found in this category.
              </Box>
            )}
        </div>
      )}
    </Box>
  )
}

// --- Main Route Component ---
function RouteComponent() {
  const theme = useTheme()
  const [activeCat, setActiveCat] = React.useState<string | null>(null)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useQuery(categoriesQuery())

  // Set first category as active by default
  React.useEffect(() => {
    if (categories.length > 0) {
      setActiveCat(categories[0].id)
    }
  }, [categories])

  // Scroll left/right in tab bar
  const scrollBy = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  // Scroll to section on tab click
  const handleTabClick = (catId: string) => {
    setActiveCat(catId)
    const el = sectionRefs.current[catId]
    if (!el) return
    const offset = 70
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Scroll-based tab highlighting
  React.useEffect(() => {
    if (!categories.length) return

    const handleScroll = () => {
      const scrollTop = window.scrollY + 70
      let current: string | null = null

      for (const cat of categories) {
        const el = sectionRefs.current[cat.id]
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (scrollTop >= offsetTop && scrollTop < offsetTop + offsetHeight) {
          current = cat.id
          break
        }
      }

      if (current && current !== activeCat) {
        setActiveCat(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories, activeCat])

  // Scroll active tab into view
  React.useEffect(() => {
    if (!activeCat) return
    const activeTab = scrollRef.current?.querySelector<HTMLDivElement>(
      `[data-id='${activeCat}']`,
    )
    activeTab?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeCat])

  if (isCategoriesLoading) return <CircularProgress />

  return (
    <React.Fragment>
      <PromotionalBanners />

      {/* Sticky Category Tabs */}
      <Box
        css={css`
          position: sticky;
          top: 0;
          background: white;
          z-index: 100;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          padding: 8px 0;
          gap: 4px;
        `}
      >
        <IconButton onClick={() => scrollBy('left')}>
          <ChevronLeft />
        </IconButton>

        <Box
          ref={scrollRef}
          css={css`
            display: flex;
            gap: 8px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            flex: 1;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {categories.map((c) => {
            const isActive = c.id === activeCat
            return (
              <div
                key={c.id}
                data-id={c.id}
                onClick={() => handleTabClick(c.id)}
                css={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '.5rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap',
                  border: '1px solid transparent',
                  color: isActive ? 'var(--primary-color)' : 'var(--black-2)',
                  borderColor: isActive
                    ? 'var(--secondary-color)'
                    : 'transparent',
                  backgroundColor: '#fff',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: isActive
                      ? 'var(--secondary-color)'
                      : 'rgba(0,0,0,0.1)',
                  },
                  [theme.breakpoints.up('md')]: {
                    fontSize: '1rem',
                  },
                })}
              >
                {c.name}
              </div>
            )
          })}
        </Box>

        <IconButton onClick={() => scrollBy('right')}>
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Category Sections */}
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 16px 0;
          margin-bottom: 150px;
        `}
      >
        {categories.map((c) => (
          <CategorySection key={c.id} category={c} sectionRefs={sectionRefs} />
        ))}
      </Box>
    </React.Fragment>
  )
}

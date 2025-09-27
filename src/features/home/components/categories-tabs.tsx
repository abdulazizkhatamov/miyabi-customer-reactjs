/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, IconButton, useTheme } from '@mui/material'
import { css } from '@emotion/react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import CategoryProducts from './category-products'
import type { Category } from '@/shared/schema/category.schema'
import axiosInstance from '@/config/axios.config'

function CategoriesTabs() {
  const { data: categories = [], isLoading } = useQuery<Array<Category>>({
    queryKey: ['categories'],
    queryFn: async (): Promise<Array<Category>> => {
      const res = await axiosInstance.get<Array<Category>>('/categories')
      return res.data
    },
  })

  const [activeCat, setActiveCat] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCat(categories[0].slug)
    }
  }, [categories])

  const scrollBy = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  if (isLoading) return <CircularProgress />

  return (
    <>
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
            const isActive = c.slug === activeCat

            return (
              <div
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
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

      {/* Active Category */}
      {activeCat && (
        <CategoryProducts
          key={activeCat}
          categorySlug={activeCat}
          categoryName={
            categories.find((c) => c.slug === activeCat)?.name ?? ''
          }
        />
      )}
    </>
  )
}

export default CategoriesTabs

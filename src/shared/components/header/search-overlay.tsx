/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { Backdrop } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import Input from '../input'
import { searchProductsQuery } from '@/shared/api/product.api'

type SearchOverlayProps = {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = React.useState('')
  const { data, isLoading } = useQuery(searchProductsQuery(query, undefined, 1))

  // Escape key close
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <Backdrop
      sx={(theme) => ({
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={open}
      onClick={onClose}
    >
      <div
        css={css({
          marginTop: '-300px',
          position: 'relative',
          width: '700px',
          color: '#000',
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          css={css({
            backgroundColor: '#fff',
            padding: '8px',
            borderRadius: '12px',
          })}
        >
          <Input
            autoFocus
            inputSize="md"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            css={css({
              width: '100%',
              fontSize: '1rem',
            })}
          />
        </div>

        {/* Suggestions */}
        <div
          css={css({
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: 0,
            background: '#fff',
            transform: 'translateY(40px)',
            borderRadius: '12px',
            overflow: 'hidden',
          })}
        >
          {isLoading && (
            <div
              css={css({
                padding: '1rem',
                textAlign: 'center',
                color: 'var(--midgray-2)',
              })}
            >
              Loading...
            </div>
          )}

          {!isLoading && data?.items.length === 0 && query.trim() !== '' && (
            <div
              css={css({
                padding: '1rem',
                textAlign: 'center',
                color: 'var(--midgray-2)',
              })}
            >
              No products found
            </div>
          )}

          {!isLoading &&
            data &&
            data.items.map((product, index) => (
              <Link
                key={index}
                to={`/product/$slug`}
                params={{ slug: product.slug }}
                onClick={onClose}
                css={css({
                  display: 'block',
                  padding: '.75rem 1rem',
                  margin: '8px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'background .2s ease, color .2s ease',
                  '&:hover': {
                    backgroundColor: 'var(--secondary-color)',
                  },
                  '&:active': {
                    backgroundColor: 'var(--lightgray-3)',
                  },
                })}
              >
                {product.name}
              </Link>
            ))}
        </div>
      </div>
    </Backdrop>
  )
}

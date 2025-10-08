/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Close as IconClose, Search as IconSearch } from '@mui/icons-material'
import type { Product } from '@/shared/schema/product.schema'
import { searchProductsQuery } from '@/shared/api/product.api'
import Input from '@/shared/components/input'

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const { data: products, isLoading } = useQuery(
    searchProductsQuery(query, undefined, 1),
  )

  return (
    <>
      {/* Floating Search Icon Button */}
      <div css={circleButton} onClick={() => setOpen(true)}>
        <IconSearch css={iconStyle} />
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          css: css({
            borderRadius: '16px',
            overflow: 'hidden',
          }),
        }}
      >
        {/* Title with Close Button */}
        <DialogTitle
          css={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            fontWeight: 600,
            fontSize: '18px',
            borderBottom: '1px solid var(--lightgray-3)',
          })}
        >
          Search Products
          <IconButton onClick={() => setOpen(false)} size="small">
            <IconClose />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent
          css={css({
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <Input
            autoFocus
            type="text"
            variant="default"
            value={query}
            placeholder="Search products..."
            onChange={(e) => setQuery(e.target.value)}
            css={css({
              width: '100%',
              boxSizing: 'border-box', // ✅ fixes overflow issue
            })}
          />

          {isLoading && <p>Loading...</p>}

          {products && products.length > 0 && (
            <List css={css({ padding: 0 })}>
              {products.map((product: Product) => (
                <ListItem
                  key={product.id}
                  component="button"
                  css={css({
                    borderBottom: '1px solid var(--lightgray-3)',
                    textAlign: 'left',
                  })}
                >
                  <ListItemText
                    primary={product.name}
                    secondary={`$${product.price}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {products && products.length === 0 && !isLoading && (
            <p css={css({ color: 'var(--midgray-2)' })}>No products found.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Styles
const circleButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '20px',
  borderRadius: '50%',
  padding: '.5rem',
  color: '#fff',
  backgroundColor: 'var(--secondary-main-color)',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  transition: 'background 0.2s ease',
  ':hover': {
    backgroundColor: 'var(--primary-color)',
  },
})

const iconStyle = css({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentcolor',
  flexShrink: 0,
  transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: 'inherit',
})

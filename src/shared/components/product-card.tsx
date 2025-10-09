/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useTheme } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useCartMutations } from '../api/cart.api'
import CartAction from './cart-action'
import type { Product } from '../schema/product.schema'

/** 🔹 Memoized CartAction */
const MemoizedCartAction = React.memo(CartAction)

/** 🔹 Styles (static outside render for perf) */
const cardStyle = (theme: any) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0 0 12px rgba(0,0,0,.05)',
    borderRadius: '.75rem',
    overflow: 'hidden',
    height: '100%',
    transition: 'all .25s ease',

    '&:hover': {
      boxShadow: '0 6px 20px rgba(0,0,0,.1)',
      transform: 'translateY(-2px)',
    },

    [theme.breakpoints.up('md')]: {
      borderRadius: '1rem',
    },
  })

const imageLinkStyle = (theme: any) =>
  css({
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    aspectRatio: '4 / 3', // ✅ Reserve space for image, prevents CLS

    [theme.breakpoints.up('md')]: {
      aspectRatio: '16 / 9',
    },

    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      transition: 'transform .3s ease',
    },

    '&:hover img': {
      transform: 'scale(1.05)',
    },
  })

const detailsStyle = (theme: any) =>
  css({
    padding: '1rem .5rem .75rem',
    [theme.breakpoints.up('md')]: {
      padding: '.75rem 1rem 1rem',
    },
  })

const titleStyle = (theme: any) =>
  css({
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: '.4375rem',
    transition: 'color .2s ease',
    cursor: 'pointer',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
  })

const descStyle = (theme: any) =>
  css({
    fontSize: '.75rem',
    color: 'var(--darkgray-4)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('md')]: { fontSize: '.875rem' },
  })

const priceRowStyle = (theme: any) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '.75rem',
    marginTop: '.75rem',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })

const priceStyle = (theme: any) =>
  css({
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--darkgray-2)',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.125rem',
      fontWeight: 700,
    },
  })

/** 🔹 Product Card */
export default function ProductCard({ product }: { product: Product }) {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const { addToCart, removeFromCart } = useCartMutations()

  // ✅ Pull cart from cache instead of triggering new query per card
  const cart: any = queryClient.getQueryData(['cart'])
  const cartItem = cart?.items.find((i: any) => i.id === product.id)

  return (
    <div css={cardStyle(theme)}>
      {/* Product Image */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        css={imageLinkStyle(theme)}
      >
        <img
          src={product.images[0]?.path || '/images/placeholder.png'}
          alt={product.name || 'Product image'}
          loading="lazy" // ✅ prevents blocking load
        />
      </Link>

      {/* Product Details */}
      <div css={detailsStyle(theme)}>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          css={css({ textDecoration: 'none', color: 'inherit' })}
        >
          <p css={titleStyle(theme)}>{product.name}</p>
          <p css={descStyle(theme)}>{product.description}</p>
        </Link>

        {/* Price & Add to Cart */}
        <div css={priceRowStyle(theme)}>
          <p css={priceStyle(theme)}>{product.price} USD</p>

          <MemoizedCartAction
            quantity={cartItem?.quantity ?? 0}
            onAdd={() => addToCart.mutate(product.id)}
            onRemove={() => removeFromCart.mutate(product.id)}
          />
        </div>
      </div>
    </div>
  )
}

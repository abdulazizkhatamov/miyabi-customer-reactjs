/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useTheme } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cartQuery, useCartMutations } from '../api/cart.api'
import CartAction from './cart-action'
import type { Product } from '../schema/product.schema'

/** 🔹 Product Card */
export default function ProductCard({ product }: { product: Product }) {
  const theme = useTheme()
  const { data: cart } = useQuery(cartQuery())
  const { addToCart, removeFromCart } = useCartMutations()

  const cartItem = cart?.items.find((i: any) => i.id === product.id)
  return (
    <div
      css={css({
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
      })}
    >
      {/* Product Image */}
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        css={css({
          position: 'relative',
          height: '7.75rem',
          cursor: 'pointer',
          overflow: 'hidden',

          [theme.breakpoints.up('md')]: {
            height: '12.5rem',
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
        })}
      >
        <img
          src={product.images[0]?.path || '/images/placeholder.png'}
          alt={product.name || 'Product image'}
        />
      </Link>

      {/* Product Details */}
      <div
        css={css({
          padding: '1rem .5rem .75rem',
          [theme.breakpoints.up('md')]: {
            padding: '.75rem 1rem 1rem',
          },
        })}
      >
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          css={css({ textDecoration: 'none', color: 'inherit' })}
        >
          <p
            css={css({
              fontSize: '1rem',
              fontWeight: 400,
              marginBottom: '.4375rem',
              transition: 'color .2s ease',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 1, // ⬅️ max 2 lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',

              [theme.breakpoints.up('md')]: {
                fontSize: '1.125rem',
                fontWeight: 600,
              },
            })}
          >
            {product.name}
          </p>
          <p
            css={css({
              fontSize: '.75rem',
              color: 'var(--darkgray-4)',
              display: '-webkit-box',
              WebkitLineClamp: 2, // ⬅️ max 2 lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              [theme.breakpoints.up('md')]: { fontSize: '.875rem' },
            })}
          >
            {product.description}
          </p>
        </Link>

        {/* Price & Add to Cart */}
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.75rem',
            marginTop: '.75rem',

            [theme.breakpoints.up('md')]: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          })}
        >
          <p
            css={css({
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--darkgray-2)',
              [theme.breakpoints.up('md')]: {
                fontSize: '1.125rem',
                fontWeight: 700,
              },
            })}
          >
            {product.price} USD
          </p>

          <CartAction
            quantity={cartItem?.quantity ?? 0}
            onAdd={() => addToCart.mutate(product.id)}
            onRemove={() => removeFromCart.mutate(product.id)}
          />
        </div>
      </div>
    </div>
  )
}

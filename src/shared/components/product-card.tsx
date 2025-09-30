/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useTheme } from '@mui/material'
import { Link, useRouteContext } from '@tanstack/react-router'
import { useAddToCart, useRemoveFromCart } from '../api/cart.api'
import Button from './ui/button'
import type { Product } from '../schema/product.schema'

/** 🔹 Product Card */
export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd?: (product: Product) => void
}) {
  const theme = useTheme()
  const { session } = useRouteContext({ from: '__root__' })
  const addToCart = useAddToCart()
  const removeFromCart = useRemoveFromCart()

  const cartItem = session.data?.cart?.items.find(
    (item) => item.id === product.id,
  )

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
          src={product.images[0]?.path || '/placeholder.png'}
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

          {!cartItem ? (
            <Button
              variant="outline"
              onClick={() => addToCart.mutate(product.id)}
            >
              Add
            </Button>
          ) : (
            <div
              css={css({ display: 'flex', gap: '.5rem', alignItems: 'center' })}
            >
              <Button
                // size="sm"
                onClick={() => removeFromCart.mutate(product.id)}
                disabled={removeFromCart.isPending}
              >
                -
              </Button>
              <span>{cartItem.quantity}</span>
              <Button
                // size="sm"
                onClick={() => addToCart.mutate(product.id)}
                disabled={addToCart.isPending}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

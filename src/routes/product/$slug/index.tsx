/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Add as IconAdd, Remove as IconRemove } from '@mui/icons-material'
import { productQuery } from '@/shared/api/product.api'
import Button from '@/shared/components/button'
import { cartQuery, useCartMutations } from '@/shared/api/cart.api'
import Breadcrumb from '@/shared/components/breadcrumb'

export const Route = createFileRoute('/product/$slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { data: product } = useSuspenseQuery(productQuery(slug))

  const { data: cart } = useQuery(cartQuery())
  const { addToCart, removeFromCart } = useCartMutations()

  const cartItem = cart?.items.find((i: any) => i.id === product.id)

  return (
    <div>
      {/* 🔹 Breadcrumb */}
      <div css={css({ marginTop: '2rem' })}>
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            {
              label: product.category.name,
              to: '/category/$slug',
              params: { slug: product.category.slug },
            },
            { label: product.name }, // no `to` = current page
          ]}
        />
      </div>

      {/* 🔹 Product Layout */}
      <div
        css={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          padding: '32px 0',
        })}
      >
        {/* Left: Product Image */}
        <div
          css={css({
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          })}
        >
          {product.images.length > 0 ? (
            <img
              src={product.images[0].path}
              alt={product.name}
              css={css({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              })}
            />
          ) : (
            <div
              css={css({
                width: '100%',
                height: '400px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '14px',
              })}
            >
              No image available
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div
          css={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}
        >
          <h1 css={css({ fontSize: '24px', fontWeight: 600 })}>
            {product.name}
          </h1>

          <div css={css({ color: '#555', fontSize: '14px' })}>
            {product.category.name}
          </div>

          <div css={css({ fontSize: '14px', color: '#666' })}>
            {product.description}
          </div>

          <div css={css({ fontSize: '14px', fontWeight: 500 })}>
            Weight: {product.weight} g
          </div>

          <div
            css={css({ fontSize: '20px', fontWeight: 700, color: '#d32f2f' })}
          >
            {parseFloat(product.price).toLocaleString()} USD
          </div>

          {/* Cart Controls */}
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '16px',
            })}
          >
            {cartItem ? (
              <div css={quantityBoxStyle}>
                <button
                  css={iconButtonStyle}
                  onClick={() => removeFromCart.mutate(product.id)}
                >
                  <IconRemove css={css({ fontSize: '14px' })} />
                </button>

                <span css={css({ flex: 1, textAlign: 'center' })}>
                  {cartItem.quantity}
                </span>

                <button
                  css={iconButtonStyle}
                  onClick={() => addToCart.mutate(product.id)}
                >
                  <IconAdd css={css({ fontSize: '14px' })} />
                </button>
              </div>
            ) : (
              <Button onClick={() => addToCart.mutate(product.id)}>
                Add to cart
              </Button>
            )}

            {cartItem && cartItem.quantity > 0 && <Button>Go to cart</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

/* --- Styles --- */
const quantityBoxStyle = css`
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 110px;
  height: 38px;
  font-size: 14px;
  font-weight: 500;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const iconButtonStyle = css`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 10px;
  line-height: 1;

  &:hover {
    color: var(--primary-color);
  }
`

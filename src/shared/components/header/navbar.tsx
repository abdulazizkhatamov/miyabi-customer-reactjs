/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Badge, Container, useTheme } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { cartQuery } from '@/shared/api/cart.api'
import SearchDialog from '@/features/search/components/search-dialog'

type NavbarProps = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  // const { data: session } = useSession()
  const theme = useTheme()

  const { data: cart } = useQuery(cartQuery())

  return (
    <div css={navbarWrapper(theme)}>
      <Container maxWidth="lg">
        <div css={navbarInner(theme)}>
          {/* Hamburger (always visible) */}
          <div css={hamburgerWrapper(theme)} onClick={onMenuClick}>
            <Menu css={iconStyle} />
          </div>

          {/* Left Section */}
          <div css={leftSection}>
            {/* Logo */}
            <div css={logoWrapper(theme)}>
              <Link to="/" css={logoLink(theme)}>
                <span
                  css={css({
                    display: 'block',
                    fontFamily: 'Hiromisake, sans-serif',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    color: '#fff', // default = white for mobile
                    [theme.breakpoints.up('md')]: {
                      fontSize: '1.2rem',
                      color: '#000', // black on desktop
                    },
                  })}
                >
                  miyabi house
                </span>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div css={rightSection(theme)}>
            {/* Search Button */}
            <SearchDialog />

            {/* Cart with Badge */}
            <Badge
              badgeContent={cart?.items.length || 0}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{
                badge: {
                  style: {
                    top: 4,
                    right: 4,
                    fontSize: '10px',
                    padding: '0 4px',
                    color: '#fff',
                    backgroundColor: 'var(--secondary-main-color)',
                  },
                },
              }}
            >
              <Link to="/cart" css={cartLink}>
                <div css={circleButton}>
                  <ShoppingCart css={{ width: 18, height: 18 }} />
                </div>
              </Link>
            </Badge>

            {/* Profile (hidden on mobile) */}
            <div css={profileButton(theme)}>
              <Person css={iconStyle} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* ---------------- Styles ---------------- */
const navbarWrapper = (theme: any) =>
  css({
    width: '100%',
    height: '3.125rem',
    backgroundColor: 'var(--primary-color)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: 'fit-content',
      padding: '.75rem 0',
      position: 'static',
    },
  })

const navbarInner = (theme: any) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '.5rem',
    [theme.breakpoints.up('md')]: { gap: '.75rem' },
  })

const leftSection = css({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
})

const logoWrapper = (theme: any) =>
  css({
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      marginTop: '7px',
      height: '1.875rem',
      width: '9.9375rem',
      background: '#fff',
      padding: '12px',
      display: 'flex',
      justifyContent: 'center',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
    },
  })

const logoLink = (theme: any) =>
  css({
    height: '2.8125rem',
    width: '6.5625rem',
    [theme.breakpoints.up('md')]: {
      height: '2rem',
      width: '6.5625rem',
      position: 'absolute',
      background: '#fff',
      padding: '2px',
    },
  })

const rightSection = (theme: any) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '.75rem',
    [theme.breakpoints.up('md')]: { gap: '1rem' },
  })

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
})

const profileButton = (theme: any) =>
  css([
    circleButton, // reuse styles
    {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  ])

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

const cartLink = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: '.5rem',
  fontSize: '.875rem',
  transition: '.3s',
})

const hamburgerWrapper = (theme: any) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    borderRadius: '50%',
    padding: '.5rem',
    color: '#fff',
    backgroundColor: 'var(--secondary-main-color)',
    order: -1, // put on left side in mobile
    [theme.breakpoints.up('md')]: {
      order: 1, // move to right side in desktop
    },
  })

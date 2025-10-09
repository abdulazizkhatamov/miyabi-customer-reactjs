/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Container, useTheme } from '@mui/material'
import { Link } from '@tanstack/react-router'
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Telegram as TelegramIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material'

export default function Footer() {
  const theme = useTheme()

  return (
    <footer css={footerWrapper(theme)}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <div css={footerMenuRow(theme)}>
          {/* Logo */}
          <div css={footerLogoWrapper(theme)}>
            <Link to="/" aria-label="Home">
              <span
                css={css({
                  display: 'block',
                  fontFamily: 'Hiromisake, sans-serif',
                  fontSize: '1.75rem',
                  fontWeight: 400,

                  [theme.breakpoints.up('lg')]: {
                    fontSize: '2rem',
                  },
                })}
              >
                miyabi house
              </span>
            </Link>
          </div>

          {/* Menus */}
          <ul css={footerMenuList(theme)}>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/">Menu</Link>
            </li>
            <li>
              <Link to="/branches">Branches</Link>
            </li>
          </ul>

          <ul css={footerMenuList(theme)}>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/">Gallery</Link>
            </li>
            <li>
              <Link to="/">Vacancies</Link>
            </li>
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li>
              <Link to="/">Certificates</Link>
            </li>
          </ul>

          <ul css={footerMenuList(theme)}>
            <li>
              <Link to="/contacts">Loyalty program</Link>
            </li>
            <li>
              <Link to="/">Public offer</Link>
            </li>
            <li>
              <Link to="/">Visiting rules</Link>
            </li>
            <li>
              <Link to="/">Refund policy</Link>
            </li>
            <li>
              <Link to="/">Delivery & Payment</Link>
            </li>
          </ul>

          {/* Business info */}
          <Box css={footerBusinessInfo(theme)}>
            <Box>
              <a href="tel:1089" css={footerBusinessPhoneNumber(theme)}>
                <PhoneIcon fontSize="large" aria-hidden="true" />
                1089
              </a>
              <p>Daily from 10:00 to 02:00</p>
            </Box>

            <Box css={css({ flex: 1 })}>
              <Box css={appLinksWrapper}>
                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download on App Store"
                >
                  <img
                    src={'/images/app_store.svg'}
                    width={110}
                    height={35}
                    alt="App Store"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download on Google Play"
                >
                  <img
                    src={'/images/google_play.svg'}
                    width={110}
                    height={35}
                    alt="Google Play"
                    loading="lazy"
                  />
                </a>
              </Box>

              <div css={socialLinksWrapper}>
                <SocialLink href="https://www.instagram.com/" label="Instagram">
                  <InstagramIcon />
                </SocialLink>
                <SocialLink href="https://www.facebook.com/" label="Facebook">
                  <FacebookIcon />
                </SocialLink>
                <SocialLink href="https://telegram.org/" label="Telegram">
                  <TelegramIcon />
                </SocialLink>
                <SocialLink href="https://www.youtube.com/" label="YouTube">
                  <YouTubeIcon />
                </SocialLink>
              </div>
            </Box>
          </Box>
        </div>

        {/* Bottom Section */}
        <div css={footerBottom(theme)}>
          <p>© Yaponamama 2025. All rights reserved.</p>

          <Box display="flex" gap="8px" alignItems="center">
            Powered by
            <a
              href="https://abdulazizkhatamov.xyz"
              target="_blank"
              rel="noreferrer noopener"
              css={poweredBy}
            >
              Abdulaziz
            </a>
          </Box>
        </div>
      </Container>
    </footer>
  )
}

/* Reusable Components */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      css={socialLink}
    >
      {children}
    </a>
  )
}

/* Styles */
const footerWrapper = (theme: any) =>
  css({
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderTop: '1px solid var(--lightgray-4)',
    padding: '1.5rem 0',
    [theme.breakpoints.up('md')]: { padding: '2rem 0' },
  })

const footerMenuRow = (theme: any) =>
  css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '2rem',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
      paddingBottom: '2.5rem',
    },
  })

const footerLogoWrapper = (theme: any) =>
  css({
    gridColumn: 'span 2',
    [theme.breakpoints.up('lg')]: { gridColumn: 'span 1' },
  })

const footerMenuList = (theme: any) =>
  css({
    fontSize: '.875rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1.5rem',
    a: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline' },
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1rem',
      marginTop: '0',
      gap: '1rem',
    },
  })

const footerBusinessInfo = (theme: any) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      gridColumn: 'span 1',
    },
  })

const footerBusinessPhoneNumber = (theme: any) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': { color: theme.palette.primary.main },
  })

const appLinksWrapper = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-end',
  marginBottom: '8px',
})

const socialLinksWrapper = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
})

const socialLink = css({
  color: 'inherit',
  '&:hover': { color: '#d32f2f' },
})

const footerBottom = (theme: any) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    color: 'var(--text-light)',
    marginTop: '1.5rem',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      marginTop: '2rem',
    },
  })

const poweredBy = css({
  fontWeight: 600,
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': { color: '#1976d2' },
})

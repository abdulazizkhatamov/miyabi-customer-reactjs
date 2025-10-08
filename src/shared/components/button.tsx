/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useTheme } from '@mui/material'

/** 🔹 Reusable Button */
export default function Button({
  children,
  variant = 'outline',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline'
}) {
  const theme = useTheme()
  const base = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1.25rem',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    padding: '.625rem 1.25rem',
    cursor: 'pointer',
    transition: 'all .2s ease',
    whiteSpace: 'nowrap',
  }

  const variants = {
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '0 4px 10px rgba(0,0,0,.15)',
      },
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: '0 4px 10px rgba(0,0,0,.15)',
      },
    },
    outline: {
      backgroundColor: '#fff',
      border: '1px solid #646464',
      color: 'var(--darkgray-2)',
      '&:hover': {
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0,0,0,.1)',
      },
    },
  }

  return (
    <button css={css({ ...base, ...variants[variant] })} {...props}>
      {children}
    </button>
  )
}

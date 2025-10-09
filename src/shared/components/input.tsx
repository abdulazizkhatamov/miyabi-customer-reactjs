/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

type InputVariant = 'default' | 'error' | 'success' | 'outlined'
type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  inputSize?: InputSize
}

export default function Input({
  variant = 'default',
  inputSize = 'md',
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      css={[baseStyle, sizeStyles[inputSize], variantStyles[variant]]}
      disabled={disabled}
      {...props}
    />
  )
}

/* 🔹 Base Styles */
const baseStyle = css({
  width: '100%',
  boxSizing: 'border-box', // prevent overflow due to padding
  borderRadius: '8px',
  fontSize: '16px',
  border: '1px solid var(--lightgray-3)',
  background: 'var(--background, #fff)',
  color: 'var(--black-2)',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '::placeholder': {
    color: 'var(--text-light)',
  },

  ':focus': {
    outline: 'none',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 2px var(--secondary-color)',
  },

  ':disabled': {
    background: 'var(--lightgray-4)',
    color: 'var(--midgray-1)',
    cursor: 'not-allowed',
  },
})

/* 🔹 Size Variants */
const sizeStyles: Record<InputSize, ReturnType<typeof css>> = {
  sm: css({
    padding: '6px 10px',
    fontSize: '14px',
  }),
  md: css({
    padding: '10px 14px',
    fontSize: '16px',
  }),
  lg: css({
    padding: '14px 18px',
    fontSize: '18px',
  }),
}

/* 🔹 Color Variants */
const variantStyles: Record<InputVariant, ReturnType<typeof css>> = {
  default: css({}),
  error: css({
    borderColor: 'var(--primary-color)',
    ':focus': {
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 2px var(--secondary-main-color)',
    },
  }),
  success: css({
    borderColor: 'green',
    ':focus': {
      borderColor: 'darkgreen',
      boxShadow: '0 0 0 2px rgba(0,128,0,0.3)',
    },
  }),
  outlined: css({
    background: 'transparent',
    borderColor: 'var(--darkgray-3)',
    ':focus': {
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 2px var(--secondary-color)',
    },
  }),
}

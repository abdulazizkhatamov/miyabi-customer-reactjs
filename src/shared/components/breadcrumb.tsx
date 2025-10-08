/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from '@tanstack/react-router'

type Crumb = {
  label: string
  to?: string
  params?: Record<string, string>
}

export default function Breadcrumb({ items }: { items: Array<Crumb> }) {
  return (
    <nav
      css={css({
        fontSize: '14px',
        color: '#555',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span
            key={index}
            css={css({ display: 'flex', alignItems: 'center' })}
          >
            {item.to && !isLast ? (
              <Link to={item.to} params={item.params} css={breadcrumbLinkStyle}>
                {item.label}
              </Link>
            ) : (
              <span css={activeCrumbStyle}>{item.label}</span>
            )}
            {!isLast && <span css={breadcrumbSeparator}>/</span>}
          </span>
        )
      })}
    </nav>
  )
}

/* --- Styles --- */
const breadcrumbLinkStyle = css`
  text-decoration: none;
  color: #555;

  &:hover {
    text-decoration: underline;
  }
`

const breadcrumbSeparator = css`
  margin: 0 8px;
  color: #aaa;
`

const activeCrumbStyle = css`
  color: var(--primary-color);
  font-weight: 400;
`

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Add as IconAdd, Remove as IconRemove } from '@mui/icons-material'

type CartActionProps = {
  quantity: number
  onAdd: () => void
  onRemove: () => void
}

export default function CartAction({
  quantity,
  onAdd,
  onRemove,
}: CartActionProps) {
  const containerStyle = css`
    border: 1px solid #ddd;
    border-radius: 12px;
    width: 110px; /* same width for both states */
    height: 38px; /* same height for both states */
    font-size: 14px;
    font-weight: 500;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  `

  if (quantity <= 0) {
    return (
      <button css={containerStyle} onClick={onAdd}>
        Add
      </button>
    )
  }

  return (
    <div css={containerStyle}>
      <button
        css={css`
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0 10px;
          line-height: 1;

          &:hover {
            color: var(--primary-color);
          }
        `}
        onClick={onRemove}
      >
        <IconRemove css={css({ fontSize: '14px' })} />
      </button>

      <span
        css={css`
          flex: 1;
          text-align: center;
        `}
      >
        {quantity}
      </span>

      <button
        css={css`
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0 10px;
          line-height: 1;

          &:hover {
            color: var(--primary-color);
          }
        `}
        onClick={onAdd}
      >
        <IconAdd css={css({ fontSize: '14px' })} />
      </button>
    </div>
  )
}

/** @jsxImportSource @emotion/react */
import { Drawer, useMediaQuery, useTheme } from '@mui/material'

interface AppDrawerProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export default function AppDrawer({ open, setOpen }: AppDrawerProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const handleClose = () => setOpen(false)

  return (
    <Drawer
      anchor={isDesktop ? 'right' : 'left'}
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: isDesktop ? 320 : 260,
            paddingTop: '1rem',
            backgroundColor: '#fff',
          },
        },
      }}
    >
      Drawer content
    </Drawer>
  )
}

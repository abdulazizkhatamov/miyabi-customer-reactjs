// theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // default
      sm: 576, // default
      md: 992, // default
      lg: 1248, // default
      xl: 1536, // default
    },
  },
})

export default theme

/** @jsxImportSource @emotion/react */
import React from 'react'
import AppDrawer from './drawer'
import Navbar from './navbar'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <header>
      <Navbar onMenuClick={() => setDrawerOpen(!drawerOpen)} />
      <AppDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </header>
  )
}

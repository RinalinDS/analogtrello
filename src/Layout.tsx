import React, { memo } from 'react'

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { Outlet } from 'react-router-dom'

import { useAppSelector } from './hooks/useAppSelector'
import { selectTheme } from './store/selectors/appSelector'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Snackbar } from './common/Snackbar'

export const Layout = memo(() => {
  const theme = useAppSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <Sidebar />
        <Outlet />
        <Snackbar />
      </AppContainer>
    </ThemeProvider>
  )
})

export const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: 8rem 1fr;
`

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: sans-serif;
    font-size: 1.6rem;
  }
`

import React from 'react'

import styled, { createGlobalStyle } from 'styled-components'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import { Snackbar } from './common/Snackbar'

export const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <Sidebar />
      <Main />
      <Snackbar />
    </AppContainer>
  )
}

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

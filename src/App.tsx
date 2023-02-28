import React from 'react'

import styled from 'styled-components'

import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Main } from './components/Main/Main'

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <Sidebar />
      <Main />
    </AppContainer>
  )
}

export const AppContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: 8rem 1fr;
`

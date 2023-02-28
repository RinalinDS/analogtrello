import styled from 'styled-components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Board } from '../Board'

export const Main = () => {
  return (
    <MainContainer>
      <Routes>
        <Route path={'/boards/:id'} element={<Board />} />
      </Routes>
    </MainContainer>
  )
}
export const MainContainer = styled.div`
  background: yellow;
`

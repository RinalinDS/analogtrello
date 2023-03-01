import styled from 'styled-components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Board } from '../Board'
import { RoutesPath } from '../../enums/RoutesPath'

export const Main = () => {
  return (
    <MainContainer>
      <Routes>
        <Route path={RoutesPath.boardId} element={<Board />} />
      </Routes>
    </MainContainer>
  )
}
export const MainContainer = styled.div`
  background: yellow;
`

import styled from 'styled-components'
import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Board } from '../Board'
import { RoutesPath } from '../../enums/RoutesPath'

export const Main = memo(() => {
  return (
    <MainContainer>
      <Routes>
        <Route path={RoutesPath.boardId} element={<Board />} />
      </Routes>
    </MainContainer>
  )
})
export const MainContainer = styled.div`
  background: lightblue;
`

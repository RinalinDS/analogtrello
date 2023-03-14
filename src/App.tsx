import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { RoutesPath } from './enums/RoutesPath'
import { Board } from './components/Board'
import { Layout } from './Layout'
import { Main } from './components/Main'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path={RoutesPath.index} element={<Layout />}>
          <Route path={RoutesPath.index} element={<Main />} />
          <Route path={RoutesPath.boardId} element={<Board />} />
        </Route>
      </Routes>
    </>
  )
}

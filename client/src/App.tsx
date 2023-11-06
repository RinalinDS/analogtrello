import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { RoutesPath } from './enums/RoutesPath'
import { Board } from './pages/Board'
import { Layout } from './pages/Layout'
import { Main } from './pages/Main'

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

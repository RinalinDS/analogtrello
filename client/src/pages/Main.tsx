import styled from 'styled-components'
import React, { memo, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { selectBoards } from '../store/selectors/boardsSelector'
import { useAppSelector } from '../hooks/useAppSelector'
import { setCurrentBoardId } from '../store/reducers/boardsReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearTheme } from '../store/reducers/appReducer'

export const Main = () => {
  const boards = useAppSelector(selectBoards)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(clearTheme())
    if (boards.length) {
      dispatch(setCurrentBoardId(+boards[0].id))
      navigate(`/boards/${boards[0].id}`)

    }
  }, [boards])

  return (
    <MainContainer>
      <Container>
        <p>Hello, it's my cheap and dirt copy of trello application.</p>
        <p>You should try to add your first board on the left side panel!</p>
        <p>You can do next things in this app: </p>
        <ul>
          <li>Add and delete boards of tasks</li>
          <li>Add, edit and delete cards that contain tasks</li>
          <li>Add, edit, delete tasks for cards</li>
          <li>You can also add the description to the tasks by clicking on them</li>
        </ul>

      </Container>
    </MainContainer>
  )
}

const MainContainer = styled.div`
    background: lightblue;
`

const Container = styled.div`
    margin-top: 5.6rem;
    background: lightblue;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2.4rem;
    font-family: "Courier New", serif;
    font-size: 2.8rem;
`
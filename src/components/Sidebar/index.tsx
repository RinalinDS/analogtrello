import React, { memo, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { BoardType } from '../../types/BoardsType'
import {
  addBoard,
  deleteBoard,
  fetchBoards,
  setCurrentBoardId,
  toggleFlagNewBoard,
} from '../../store/reducers/boardsReducer'

import {
  selectBoards,
  selectCurrentBoardId,
  selectFlag,
} from '../../store/selectors/boardsSelector'
import { RoutesPath } from '../../enums/RoutesPath'

import { BasicMenu } from '../../common/Menu'

import { Text } from '../../common/shared/style'

import { clearTheme } from '../../store/reducers/appReducer'

import { BoardLink } from './BoardLink'

export const Sidebar = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const boards = useAppSelector<BoardType[]>(selectBoards)
  const currentBoardId = useAppSelector<number | null>(selectCurrentBoardId)
  const flag = useAppSelector<boolean>(selectFlag)

  const addBoardHandler = useCallback(
    (title: string, color: string) => {
      const id = +new Date()
      dispatch(addBoard({ id, title, color }))
    },
    [dispatch],
  )

  const onDeleteButtonClick = useCallback(
    (id: number) => {
      dispatch(deleteBoard({ id }))
      if (id === currentBoardId) {
        navigate(RoutesPath.index)
        dispatch(clearTheme())
      }
    },
    [navigate, dispatch, currentBoardId],
  )

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  useEffect(() => {
    if (flag && boards.length) {
      dispatch(setCurrentBoardId({ id: boards.at(-1)?.id! }))
      navigate(`/boards/${boards.at(-1)?.id}`)
      dispatch(toggleFlagNewBoard(false))
    }
  }, [flag])

  return (
    <SidebarContainer>
      <AddBoardContainer>
        <Text>Your boards</Text>
        <BasicMenu plus addBoardHandler={addBoardHandler} />
      </AddBoardContainer>
      <List>
        {boards.map((m, _i) => {
          return (
            <BoardLink
              active={currentBoardId === m.id}
              key={m.id}
              title={m.title}
              id={m.id}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          )
        })}
      </List>
    </SidebarContainer>
  )
})

export const SidebarContainer = styled.div`
  grid-row-start: span 2;
  width: 26rem;
  background: ${props => props.theme.background || 'green'};
  height: 100%;
  border-right: 1px solid white;
  padding: 1.2rem 2.4rem;
`

export const AddBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
    width: 70%;
    padding: 0.6rem;
  }

  & a:hover {
  }

  & a:active {
  }
`

import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import {
  addBoard,
  deleteBoard,
  fetchBoards,
  setCurrentBoardId,
  toggleIsNewBoardCreated,
} from '../../store/reducers/boardsReducer'
import { BoardType } from '../../types/BoardsType'

import { RoutesPath } from '../../enums/RoutesPath'
import {
  selectBoards,
  selectCurrentBoardId,
  selectIsNewBoardCreated,
} from '../../store/selectors/boardsSelector'

import { BasicMenu } from '../../common/Menu'

import { clearTheme } from '../../store/reducers/appReducer'

import { ServicePath } from '../../enums/ServicePath'

import { AddBoardForm } from '../../common/AddForms/AddBoardForm'
import { LabelMessage } from '../../enums/Message'

import { BoardLink } from './BoardLink'

export const Sidebar: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const boards = useAppSelector<BoardType[]>(selectBoards)
  const currentBoardId = useAppSelector<number | null>(selectCurrentBoardId)
  const isNewBoardCreated = useAppSelector<boolean>(selectIsNewBoardCreated)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const lastBoardId = boards.at(-1)?.id
  const newBoardUrl = `${ServicePath.boards}/${lastBoardId}`

  const addBoardHandler = useCallback(
    (title: string, color: string) => {
      const id = +new Date()
      dispatch(addBoard({ id, title, color }))
      setAnchorEl(null)
    },
    [dispatch],
  )

  const deleteBoardHandler = useCallback(
    (id: number) => {
      dispatch(deleteBoard({ id }))
      if (id === currentBoardId) {
        navigate(RoutesPath.index)
        dispatch(clearTheme())
        dispatch(setCurrentBoardId(null))
      }
    },
    [navigate, dispatch, currentBoardId],
  )

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  useEffect(() => {
    if (isNewBoardCreated && boards.length) {
      dispatch(setCurrentBoardId(lastBoardId!))
      navigate(newBoardUrl)
      dispatch(toggleIsNewBoardCreated(false))
    }
  }, [isNewBoardCreated, boards, dispatch, navigate, lastBoardId, newBoardUrl])

  return (
    <SidebarContainer>
      <AddBoardContainer>
        <Title>Your boards</Title>
        <BasicMenu iconType={'plus'} anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
          <AddBoardForm callBack={addBoardHandler} label={LabelMessage.BoardTitle} />
        </BasicMenu>
      </AddBoardContainer>
      <List>
        {boards.map((m, _i) => {
          return (
            <BoardLink
              active={currentBoardId === m.id}
              key={m.id}
              title={m.title}
              id={m.id}
              onDeleteButtonClick={deleteBoardHandler}
            />
          )
        })}
      </List>
    </SidebarContainer>
  )
}

export const SidebarContainer = styled.div`
  grid-row-start: span 2;
  width: 26rem;
  background: ${props => props.theme.background || 'lightblue'};
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
    color: ${props => (props.theme.background ? '#fff' : 'black')};
  }

  & a:hover {
  }

  & a:active {
  }
`

const Title = styled.h1`
  font-weight: 500;
  color: ${props => (props.theme.background ? '#fff' : 'black')};
  font-size: 20px;
`

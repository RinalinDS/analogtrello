import React, { memo, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import IconButton from '@mui/material/IconButton'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { BoardType } from '../../types/BoardsType'
import { addBoard, deleteBoard, fetchBoards } from '../../store/reducers/boardsReducer'

import { selectBoards, selectCurrentBoardId } from '../../store/selectors/boardsSelector'
import { RoutesPath } from '../../enums/RoutesPath'

import { BasicMenu } from '../../common/Menu'

import { BoardLink } from './BoardLink'

export const Sidebar = memo(() => {
  // const [isAddModalActive, setIsAddModalActive] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const boards = useAppSelector<BoardType[]>(selectBoards)
  const currentBoardId = useAppSelector<number | null>(selectCurrentBoardId)

  const addBoardHandler = useCallback(
    (title: string, color: string) => {
      const id = +new Date()
      dispatch(addBoard({ id, title, color }))
      // dispatch(setCurrentBoardId({ id }))
      // navigate(`boards/${id}`)
      // setIsAddModalActive(false)
    },
    [dispatch],
  )

  // const activateModal = useCallback(() => setIsAddModalActive(true), [])

  const onDeleteButtonClick = useCallback(
    (id: number) => {
      dispatch(deleteBoard({ id }))
      navigate(RoutesPath.index)
    },
    [navigate, dispatch],
  )

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <SidebarContainer>
      <AddBoardContainer>
        <StyledSpan>Your boards</StyledSpan>
        <BasicMenu plus addBoardHandler={addBoardHandler} />
        {/*<StyledIconButton onClick={activateModal}>*/}
        {/*  <AddIcon />*/}
        {/*</StyledIconButton>*/}
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
      {/*/!*<Modal setIsModalVisible={setIsAddModalActive} visible={isAddModalActive}>*!/*/}
      {/*<BasicMenu>*/}
      {/*  <AddItemForm callBack={addBoardHandler} label={LabelMessage.BoardTitle} />*/}
      {/*</BasicMenu>*/}
      {/*/!*</Modal>*!/*/}
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

export const StyledSpan = styled.span``

export const StyledIconButton = styled(IconButton)`
  & > svg {
    font-size: 2.4rem;
  }
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

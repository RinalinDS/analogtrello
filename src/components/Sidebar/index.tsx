import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import IconButton from '@mui/material/IconButton'

import AddIcon from '@mui/icons-material/Add'

import { Link, useNavigate } from 'react-router-dom'

import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { Modal } from '../../common/Modal'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { AddItemForm } from '../../common/AddItemForm/AddBoardForm'

import { BoardType } from '../../types/BoardsType'
import { addBoard, deleteBoard, fetchBoards } from '../../store/reducers/boardsReducer'

import { selectBoards, selectCurrentBoard } from '../../store/selectors/boardsSelector'
import { LabelMessage } from '../../enums/Message'
import { ServicePath } from '../../enums/ServicePath'
import { RoutesPath } from '../../enums/RoutesPath'

export const Sidebar = memo(() => {
  const [isModalActive, setIsModalActive] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const boards = useAppSelector<BoardType[]>(selectBoards)
  const currentBoard = useAppSelector<BoardType>(selectCurrentBoard)

  const addBoardHandler = useCallback(
    (title: string, color: string) => {
      const id = +new Date()
      dispatch(addBoard({ id, title, color }))
      setIsModalActive(false)
    },
    [dispatch],
  )

  const activateModal = useCallback(() => setIsModalActive(true), [])

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

  //TODO separate for map component

  return (
    <SidebarContainer>
      <AddBoardContainer>
        <StyledSpan>Your boards</StyledSpan>
        <StyledIconButton onClick={activateModal}>
          <AddIcon />
        </StyledIconButton>
      </AddBoardContainer>
      <List>
        {boards.map((m, _i) => {
          return (
            <Item key={m.id} active={currentBoard?.id === m.id}>
              <Link to={`${ServicePath.boards}/${m.id}`}>{m.title}</Link>
              <StyledIconButton
                onClick={() => {
                  onDeleteButtonClick(m.id)
                }}
              >
                <CloseSharpIcon />
              </StyledIconButton>
            </Item>
          )
        })}
      </List>
      <Modal setIsModalVisible={setIsModalActive} visible={isModalActive}>
        <AddItemForm callBack={addBoardHandler} label={LabelMessage.BoardTitle} />
      </Modal>
    </SidebarContainer>
  )
})

export const SidebarContainer = styled.div`
  grid-row-start: span 2;
  width: 26rem;
  background: green;
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

export const Item = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ active }) => (active ? 'rgba(173, 216, 230, 0.6)' : '')};

  &:hover {
    background: rgba(173, 216, 230, 0.35);
  }
`

import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import IconButton from '@mui/material/IconButton'

import AddIcon from '@mui/icons-material/Add'

import { Link } from 'react-router-dom'

import { Modal } from '../../common/Modal'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { AddItemForm } from '../../common/AddItemForm'

import { BoardType } from '../../types/BoardsType'
import { addBoard, fetchBoards } from '../../store/reducers/boardsReducer'

import { selectBoards } from '../../store/selectors/boardsSelector'
import { LabelMessage } from '../../enums/Message'
import { ServicePath } from '../../enums/ServicePath'

export const Sidebar = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const dispatch = useAppDispatch()
  const boards = useAppSelector<BoardType[]>(selectBoards)

  const addBoardHandler = useCallback(
    (title: string) => {
      const id = +new Date()
      dispatch(addBoard({ id, title }))
      setIsModalActive(false)
    },
    [dispatch],
  )

  const activateModal = useCallback(() => setIsModalActive(true), [])

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

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
            <Item key={m.id}>
              <Link to={`${ServicePath.boards}/${m.id}`}>{m.title}</Link>
            </Item>
          )
        })}
      </List>
      <Modal setIsModalVisible={setIsModalActive} visible={isModalActive}>
        <AddItemForm callBack={addBoardHandler} label={LabelMessage.BoardTitle} />
      </Modal>
    </SidebarContainer>
  )
}

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

  & div:hover {
    background: lightblue;
  }

  & a:link,
  a:visited {
    color: #1098ad;
    text-decoration: none;
  }

  & a:hover {
    color: gray;
    font-weight: bold;
  }

  & a:active {
    background-color: black;
    font-style: italic;
  }
`

export const Item = styled.div``

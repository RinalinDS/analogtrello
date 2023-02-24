import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import { Link } from 'react-router-dom'

import { Modal } from '../../common/Modal/Modal'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { addBoardFulFilled, BoardType } from '../../store/reducers/boardReducer'

import { AddItemForm } from '../../common/AddItemForm/AddItemForm'

import styles from './Sidebar.module.css'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector<BoardType[]>(state => state.board)

  const addBoardHandler = (title: string) => {
    const id = +new Date()
    dispatch(addBoardFulFilled({ id, title }))
    setIsModalActive(false)
  }

  const [isModalActive, setIsModalActive] = useState(false)
  const activateModal = () => setIsModalActive(true)
  return (
    <SidebarContainer>
      <div className={styles.addBoard}>
        <span>Your boards</span>
        <IconButton className={styles.button} onClick={activateModal}>
          <AddIcon />
        </IconButton>
      </div>
      <List>
        {boards.map((m, _i) => {
          return (
            <li>
              <Link to={`/boards/${m.id}`}>{m.title}</Link>
            </li>
          )
        })}
      </List>
      <Modal setIsModalVisible={setIsModalActive} visible={isModalActive}>
        <AddItemForm callBack={addBoardHandler} />
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
  //overflow-y: scroll;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;

  & li:hover {
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

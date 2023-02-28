import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addCard, fetchCards } from '../store/reducers/boardsReducer'
import { AddItemForm } from '../common/AddItemForm/AddItemForm'

import { Tasks } from './Task'

export const Board: FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  // TODO Reselect
  const cards = useAppSelector(state => state.boards.cards.filter(f => f.boardId === +id!)) // how to avoid undefined properly ?

  const addCardHandler = (title: string) => {
    const cardId = +new Date()
    dispatch(addCard({ id: cardId, title, boardId: +id! }))
  }

  useEffect(() => {
    if (id) dispatch(fetchCards({ id: +id }))
  }, [id, dispatch])

  return (
    <CardsContainer>
      {cards.map(m => {
        return (
          <div key={m.id}>
            <div>card title: {m.title || 'no board with this id'}</div>
            <ul>
              <Tasks cardId={m.id} />
            </ul>
          </div>
        )
      })}
      <div>
        <AddItemForm callBack={addCardHandler} label={'Enter list title'} />
      </div>
    </CardsContainer>
  )
}

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`

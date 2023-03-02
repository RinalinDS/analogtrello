import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectTasksByCardId } from '../../store/selectors/cardsSelector'
import { addCard, fetchCards } from '../../store/reducers/cardsReducer'
import { LabelMessage } from '../../enums/Message'
import { AddItemForm } from '../../common/AddItemForm'
import { Card } from '../Card'

export const Board: FC = memo(() => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => selectTasksByCardId(state, id))

  const addCardHandler = useCallback(
    (title: string) => {
      const cardId = +new Date()
      dispatch(addCard({ id: cardId, title, boardId: +id! }))
    },
    [id, dispatch],
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchCards({ id: +id }))
    }
  }, [id, dispatch])

  return (
    <BoardContainer>
      <CardsContainer>
        {cards.map(m => (
          <Card id={m.id} title={m.title} key={m.id} />
        ))}
      </CardsContainer>
      <AddItemForm callBack={addCardHandler} label={LabelMessage.EnterListTitle} />
    </BoardContainer>
  )
})

export const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
`
export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`

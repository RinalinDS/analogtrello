import React, { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { AddItemForm } from '../../common/AddItemForm'

import { Tasks } from '../Tasks'
import { selectTasksByCardId } from '../../store/selectors/cardsSelector'
import { addCard, fetchCards } from '../../store/reducers/cardsReducer'
import { LabelMessage } from '../../enums/Message'

export const Board: FC = () => {
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
    <CardsContainer>
      {cards.map(m => {
        return (
          <StyledDiv key={m.id}>
            <StyledDiv>card title: {m.title || 'no board with this id'}</StyledDiv>
            <Tasks cardId={m.id} />
          </StyledDiv>
        )
      })}
      <div>
        <AddItemForm callBack={addCardHandler} label={LabelMessage.EnterListTitle} />
      </div>
    </CardsContainer>
  )
}

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`
export const StyledDiv = styled.div``

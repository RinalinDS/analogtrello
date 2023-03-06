import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectTasksByCardId } from '../../store/selectors/cardsSelector'
import { addCard, fetchCards } from '../../store/reducers/cardsReducer'
import { LabelMessage } from '../../enums/Message'
import { Card } from '../Card'
import { AddListForm } from '../../common/AddItemForm/AddListForm'
import { BoardType } from '../../types/BoardsType'
import { selectCurrentBoard } from '../../store/selectors/boardsSelector'
import { setCurrentBoard } from '../../store/reducers/boardsReducer'

export const Board: FC = memo(() => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => selectTasksByCardId(state, id))
  const currentBoard = useAppSelector<BoardType>(selectCurrentBoard)

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
      dispatch(setCurrentBoard({ id: +id }))
    }
  }, [id, dispatch])

  return (
    <BoardContainer bgColor={currentBoard?.color}>
      <CardsContainer>
        {cards.map(m => (
          <Card id={m.id} title={m.title} key={m.id} />
        ))}
      </CardsContainer>
      <AddListForm
        callBack={addCardHandler}
        label={LabelMessage.EnterListTitle}
        isListEmpty={cards.length < 1}
      />
    </BoardContainer>
  )
})

export const BoardContainer = styled.div<{ bgColor: string | undefined }>`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.2rem 2.4rem;
  height: 100%;
  background: ${props => props.bgColor || 'lightblue'};
`
export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`

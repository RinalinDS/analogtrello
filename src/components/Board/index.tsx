import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectTasksByCardId } from '../../store/selectors/cardsSelector'
import { addCard, fetchCards } from '../../store/reducers/cardsReducer'
import { Card } from '../Card'
import { BoardType } from '../../types/BoardsType'
import { selectCurrentBoard } from '../../store/selectors/boardsSelector'
import { setTheme } from '../../store/reducers/appReducer'
import { AddItemForm } from '../../common/AddItemForm'
import { LabelMessage } from '../../enums/Message'

export const Board: FC = memo(() => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const cards = useAppSelector(state => selectTasksByCardId(state, id))
  const currentBoard = useAppSelector<BoardType | undefined>(state => selectCurrentBoard(state, id))

  const addCardHandler = useCallback(
    (title: string) => {
      const cardId = +new Date()
      dispatch(addCard({ id: cardId, title, boardId: +id! }))
    },
    [id, dispatch],
  )

  useEffect(() => {
    if (currentBoard?.id) {
      dispatch(setTheme({ background: currentBoard?.color }))
    }
  }, [currentBoard, dispatch])

  useEffect(() => {
    // currentBoard.id ?
    if (id) {
      dispatch(fetchCards({ id: +id }))
    }
  }, [id, dispatch])

  // bgColor={currentBoard?.color}

  return (
    <BoardContainer>
      <CardsContainer>
        {cards.map(m => (
          <Card id={m.id} title={m.title} key={m.id} />
        ))}
      </CardsContainer>
      {/*<AddListForm*/}
      {/*  callBack={addCardHandler}*/}
      {/*  label={LabelMessage.EnterListTitle}*/}
      {/*  isListEmpty={cards.length < 1}*/}
      {/*/>*/}
      <AddItemForm
        callBack={addCardHandler}
        label={LabelMessage.EnterListTitle}
        btnText={cards.length < 1 ? 'Add a list' : 'Add another list'}
        submitBtnText={LabelMessage.AddList}
        component={'input'}
        list={true}
      />
    </BoardContainer>
  )
})

export const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.2rem 2.4rem;
  height: 100%;
  background: ${props => props.theme.background || 'lightblue'};
  color: ${props => props.theme.color || 'black'};
`
export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
`

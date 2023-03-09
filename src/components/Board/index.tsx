import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { Preloader } from '../../common/Prealoader'
import { RoutesPath } from '../../enums/RoutesPath'
import { selectIsLoading } from '../../store/selectors/appSelector'

export const Board: FC = memo(() => {
  const { id } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cards = useAppSelector(state => selectTasksByCardId(state, id))
  const currentBoard = useAppSelector<BoardType | null>(state => selectCurrentBoard(state, id))

  const isDataLoading = useAppSelector(selectIsLoading)

  const addCardHandler = useCallback(
    (title: string) => {
      const cardId = +new Date()
      dispatch(addCard({ id: cardId, title, boardId: +id! }))
    },
    [id, dispatch],
  )

  useEffect(() => {
    setIsPageLoading(true)
    if (currentBoard) {
      dispatch(fetchCards({ id: currentBoard.id }))
      dispatch(setTheme({ background: currentBoard?.color }))
    }
    setIsPageLoading(false)
  }, [currentBoard, dispatch])

  useEffect(() => {
    if (!isPageLoading && !currentBoard && !isDataLoading) {
      navigate(RoutesPath.index)
    }
  }, [isPageLoading, isDataLoading, currentBoard, navigate])

  if (isPageLoading) return <Preloader />

  return (
    <BoardContainer>
      <CardsContainer>
        {cards.map(m => (
          <Card id={m.id} title={m.title} key={m.id} />
        ))}
      </CardsContainer>
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

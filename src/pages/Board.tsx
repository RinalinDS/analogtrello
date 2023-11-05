import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { selectTasksByCardId } from '../store/selectors/cardsSelector'
import { addCard, fetchCards } from '../store/reducers/cardsReducer'
import { Card } from '../components/Card'
import { BoardType } from '../types/BoardsType'
import { selectCurrentBoard } from '../store/selectors/boardsSelector'
import { setTheme } from '../store/reducers/appReducer'
import { AddTasksAndCardsForm } from '../common/AddForms/AddTasksAndCardsForm'
import { LabelMessage } from '../enums/Message'
import { RoutesPath } from '../enums/RoutesPath'
import { selectIsLoading } from '../store/selectors/appSelector'
import { setCurrentBoardId } from '../store/reducers/boardsReducer'
import { AddItemContainer, Text } from '../common/shared/style'

export const Board: FC = memo(() => {
  const { id } = useParams() as Required<{ id: string }>
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cards = useAppSelector(state => selectTasksByCardId(state, id))
  const currentBoard = useAppSelector<BoardType | null>(state => selectCurrentBoard(state, id))

  const isDataLoading = useAppSelector(selectIsLoading)

  const closeForm = useCallback(() => setIsFormOpened(false), [])
  const openForm = useCallback(() => setIsFormOpened(true), [])

  const addCardHandler = useCallback(
    (title: string) => {
      const cardId = +new Date()
      dispatch(addCard({ id: cardId, title, boardId: +id }))
    },
    [id, dispatch],
  )

  useEffect(() => {
    if (id) {
      dispatch(setCurrentBoardId(+id))
      setIsFormOpened(false)
    }
  }, [id, dispatch])

  useEffect(() => {
    if (currentBoard) {
      dispatch(fetchCards({ id: currentBoard.id }))
      dispatch(setTheme({ background: currentBoard.color }))
    }
  }, [currentBoard, dispatch])

  useEffect(() => {
    if (!currentBoard && !isDataLoading) {
      navigate(RoutesPath.index)
      dispatch(setCurrentBoardId(null))
    }
  }, [isDataLoading, currentBoard, navigate, dispatch])

  return (
    <BoardContainer>
      <CardsContainer>
        {cards.map(m => (
          <Card id={m.id} title={m.title} key={m.id} />
        ))}
      </CardsContainer>
      {isFormOpened ? (
        <AddTasksAndCardsForm
          callBack={addCardHandler}
          label={LabelMessage.EnterListTitle}
          submitBtnText={LabelMessage.AddList}
          component={'input'}
          isForAddingCard
          closeForm={closeForm}
        />
      ) : (
        <AddItemContainer onClick={openForm} $isForAddingCard>
          <Text whiteText>
            &#43; {cards.length ? LabelMessage.AddAnotherList : LabelMessage.AddList}
          </Text>
        </AddItemContainer>
      )}
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

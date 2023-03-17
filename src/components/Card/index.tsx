import React, { FC, memo, useCallback } from 'react'

import styled from 'styled-components'

import { Tasks } from '../Tasks'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { changeCardTitle, deleteCard } from '../../store/reducers/cardsReducer'

import { CardTitle } from './CardTitle'

type CardPropsType = {
  id: number
  title: string
}

export const Card: FC<CardPropsType> = memo(({ id, title }) => {
  const dispatch = useAppDispatch()
  const deleteCardHandler = useCallback(() => {
    dispatch(deleteCard({ id }))
  }, [dispatch, id])

  const changeCardTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeCardTitle({ title: newTitle, id }))
    },
    [dispatch, id],
  )

  return (
    <CardContent>
      <CardTitle
        title={title}
        deleteCard={deleteCardHandler}
        changeTitle={changeCardTitleHandler}
      />
      <Tasks cardId={id} cardTitle={title} />
    </CardContent>
  )
})

export const CardContent = styled.div`
  width: 27.2rem;
  padding: 0.6rem 1.2rem;
  height: 100%;
  vertical-align: top;
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  max-height: 100%;
  position: relative;
  white-space: normal;
  font-size: 1.4rem;
`

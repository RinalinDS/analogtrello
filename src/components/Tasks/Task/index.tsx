import React, { FC, memo, useCallback } from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import IconButton from '@mui/material/IconButton'

import { deleteTask } from '../../../store/reducers/tasksReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

type TaskPropsType = {
  cardId: number
  title: string
  id: number
}

export const Task: FC<TaskPropsType> = memo(({ title, id, cardId }) => {
  const dispatch = useAppDispatch()
  const onDeleteButtonClick = useCallback(() => {
    dispatch(deleteTask({ id, cardId }))
  }, [cardId, dispatch, id])

  return (
    <Item>
      <Text>{title}</Text>
      <StyledIconButton onClick={onDeleteButtonClick}>
        <CloseSharpIcon />
      </StyledIconButton>
    </Item>
  )
})

export const Text = styled.span``

export const Item = styled.div`
  background: white;
  word-wrap: break-word;
  color: #172b4d;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  min-height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    display: none;
    padding: 0;
  }

  &:hover button {
    display: inline-flex;
  }
`

export const StyledIconButton = styled(IconButton)`
  & > svg {
    font-size: 2rem;
  }
`

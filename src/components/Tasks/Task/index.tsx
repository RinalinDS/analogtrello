import React, { FC, memo, useCallback } from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { deleteTask } from '../../../store/reducers/tasksReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { StyledIconButton, Text } from '../../../common/shared/style'

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
      <TextTask>{title}</TextTask>
      <StyledIconButton onClick={onDeleteButtonClick}>
        <CloseSharpIcon />
      </StyledIconButton>
    </Item>
  )
})

export const TextTask = styled(Text)`
  padding-right: 5rem;
`

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

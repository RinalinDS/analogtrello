import React, { FC, memo, MouseEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { StyledIconButton, Text } from '../../../common/shared/style'
import { TaskType } from '../../../types/BoardsType'
import {
  changeTaskDescription,
  changeTaskTitle,
  deleteTask,
} from '../../../store/reducers/tasksReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { Modal } from '../../../common/Modal'
import { DetailedTask } from '../DetailedTask'

type TaskPropsType = {
  task: TaskType
  cardTitle: string
}

export const Task: FC<TaskPropsType> = memo(({ task, cardTitle }) => {
  const dispatch = useAppDispatch()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const { id, title, cardId, description } = task

  const openModal = useCallback(() => {
    setIsVisible(true)
  }, [])

  const deleteTaskHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      dispatch(deleteTask({ id, cardId }))
    },
    [cardId, dispatch, id],
  )

  const changeTaskTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTaskTitle({ title: newTitle, id, cardId }))
    },
    [dispatch, id, cardId],
  )

  const changeTaskDescriptionHandler = useCallback(
    (newDescription: string) => {
      dispatch(changeTaskDescription({ description: newDescription, id, cardId }))
    },
    [dispatch, id, cardId],
  )

  return (
    <>
      <TaskItem onClick={openModal}>
        <TaskText>{title}</TaskText>
        <StyledIconButton onClick={deleteTaskHandler}>
          <CloseSharpIcon />
        </StyledIconButton>
      </TaskItem>
      <Modal setIsVisible={setIsVisible} visible={isVisible}>
        <DetailedTask
          title={title}
          description={description}
          changeTitle={changeTaskTitleHandler}
          changeDescription={changeTaskDescriptionHandler}
          cardTitle={cardTitle}
        />
      </Modal>
    </>
  )
})

export const TaskText = styled(Text)`
  padding-right: 5rem;
`

export const TaskItem = styled.div`
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

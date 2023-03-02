import React, { FC, memo, useCallback, useEffect } from 'react'

import styled from 'styled-components'

import { useAppSelector } from '../../hooks/useAppSelector'
import { TaskType } from '../../types/BoardsType'
import { AddItemForm } from '../../common/AddItemForm'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { selectTasksByCardId } from '../../store/selectors/tasksSelector'
import { addTask, fetchTasks } from '../../store/reducers/tasksReducer'
import { LabelMessage } from '../../enums/Message'

export const Tasks: FC<{ cardId: number }> = memo(({ cardId }) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TaskType[]>(state => selectTasksByCardId(state, cardId))

  const addTaskHandler = useCallback(
    (title: string) => {
      const taskId = +new Date()
      dispatch(addTask({ id: taskId, title, cardId: cardId }))
    },
    [cardId, dispatch],
  )

  useEffect(() => {
    dispatch(fetchTasks({ id: cardId }))
  }, [cardId, dispatch])

  return (
    <>
      <TasksContainer>
        {tasks.map(m => (
          <Item key={m.id}>{m.title}</Item>
        ))}
      </TasksContainer>
      <AddItemForm callBack={addTaskHandler} label={LabelMessage.AddTask} />
    </>
  )
})

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`

export const Item = styled.div``

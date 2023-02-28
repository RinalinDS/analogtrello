import React, { FC, useEffect } from 'react'

import styled from 'styled-components'

import { useAppSelector } from '../hooks/useAppSelector'
import { TaskType } from '../types/BoardsType'
import { AddItemForm } from '../common/AddItemForm/AddItemForm'
import { addTask, fetchTasks } from '../store/reducers/boardsReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'

export const Tasks: FC<{ cardId: number }> = ({ cardId }) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TaskType[]>(state => state.boards.tasks[cardId] || [])

  const addTaskHandler = (title: string) => {
    const taskId = +new Date()
    dispatch(addTask({ id: taskId, title, cardId: cardId }))
  }

  useEffect(() => {
    dispatch(fetchTasks({ id: cardId }))
  }, [])

  return (
    <TasksContainer>
      {tasks.map(m => (
        <div key={m.id}>{m.title}</div>
      ))}
      <AddItemForm callBack={addTaskHandler} label={'Add task'} />
    </TasksContainer>
  )
}

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`

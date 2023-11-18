import { FC, memo, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

import { LabelMessage } from '../../enums/Message'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { addTask, fetchTasks } from '../../store/reducers/tasksReducer'
import { selectTasksByCardId } from '../../store/selectors/tasksSelector'
import { TaskType } from '../../types/BoardsType'

import { AddTasksAndCardsForm } from '../../common/AddForms/AddTasksAndCardsForm'

import { AddItemContainer, Text } from '../../common/shared/style'

import { Task } from './Task'

type Props = {
  cardId: number
  cardTitle: string
}

export const Tasks: FC<Props> = memo(({ cardId, cardTitle }) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TaskType[]>(state => selectTasksByCardId(state, cardId))
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false)

  const closeForm = useCallback(() => setIsFormOpened(false), [])
  const openForm = useCallback(() => setIsFormOpened(true), [])

  const addTaskHandler = useCallback(
    (title: string) => {
      const taskId = +new Date()
      dispatch(addTask({ id: taskId, title, cardId: cardId, description: '' }))
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
          <Task task={m} key={m.id} cardTitle={cardTitle} />
        ))}
      </TasksContainer>
      {isFormOpened ? (
        <AddTasksAndCardsForm
          callBack={addTaskHandler}
          label={LabelMessage.EnterTaskTitle}
          component={'textarea'}
          submitBtnText={LabelMessage.AddTask}
          closeForm={closeForm}
        />
      ) : (
        <AddItemContainer onClick={openForm}>
          <Text>&#43; {LabelMessage.AddTask}</Text>
        </AddItemContainer>
      )}
    </>
  )
})

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
`

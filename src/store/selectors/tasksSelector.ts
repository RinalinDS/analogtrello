import { createSelector } from 'reselect'

import { AppRootStateType } from '../index'

const selectTasks = (state: AppRootStateType) => state.tasks.tasks

export const selectTasksByCardId = createSelector(
  [selectTasks, (_, cardId) => ({ cardId })],
  (tasks, { cardId }) => {
    return tasks[cardId] || []
  },
)

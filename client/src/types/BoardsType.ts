export type BoardType = {
  id: number
  title: string
  color: string
}

export type CardType = {
  id: number
  title: string
  boardId: number
}

export type TaskType = {
  id: number
  title: string
  cardId: number
  description: string
}
export type ChangeDescriptionPayloadType = Pick<TaskType, 'cardId' | 'description' | 'id'>
export type ChangeTaskTitlePayloadType = Pick<TaskType, 'cardId' | 'title' | 'id'>

export type DeleteTaskPayloadType = {
  cardId: number
  id: number
}

export type ChangeCardTitlePayloadType = {
  title: string
  id: number
}

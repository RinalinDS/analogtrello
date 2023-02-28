export type BoardType = {
  id: number
  title: string
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
}

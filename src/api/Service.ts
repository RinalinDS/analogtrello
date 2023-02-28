import axios, { AxiosResponse } from 'axios'

import { BoardType, CardType, TaskType } from '../types/BoardsType'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {},
})

export class Service {
  static async getBoards(): Promise<AxiosResponse<BoardType[]>> {
    return instance.get('/boards')
  }

  static async getCards(id: number): Promise<AxiosResponse<CardType[]>> {
    return instance.get(`/boards/${id}?_embed=cards`)
  }

  static async getTasks(id: number): Promise<AxiosResponse<TaskType[]>> {
    return instance.get(`/cards/${id}?_embed=tasks`)
  }

  static async addBoard(board: BoardType): Promise<AxiosResponse<BoardType>> {
    return instance.post('/boards', board)
  }

  static async addCard(card: CardType): Promise<AxiosResponse<CardType>> {
    return instance.post('/cards', card)
  }
  static async addTask(task: TaskType): Promise<AxiosResponse<TaskType>> {
    return instance.post('/tasks', task)
  }
}

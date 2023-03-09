import axios, { AxiosResponse } from 'axios'

import { ServicePath } from '../enums/ServicePath'

import { BoardType, CardType, TaskType } from '../types/BoardsType'

const baseURL = 'http://localhost:4000'

const instance = axios.create({
  baseURL,
  headers: {},
})

export class Service {
  static async getBoards(): Promise<AxiosResponse<BoardType[]>> {
    return instance.get(ServicePath.boards)
  }

  static async getCardsByBoardId(id: number): Promise<AxiosResponse<CardType[]>> {
    return instance.get(`${ServicePath.boards}/${id}?_embed=cards`)
  }

  static async getTasksByCardsId(id: number): Promise<AxiosResponse<TaskType[]>> {
    return instance.get(`${ServicePath.cards}/${id}?_embed=tasks`)
  }

  static async addBoard(board: BoardType): Promise<AxiosResponse<BoardType>> {
    return instance.post(ServicePath.boards, board)
  }

  static async addCard(card: CardType): Promise<AxiosResponse<CardType>> {
    return instance.post(ServicePath.cards, card)
  }

  static async addTask(task: TaskType): Promise<AxiosResponse<TaskType>> {
    return instance.post(ServicePath.tasks, task)
  }

  static async deleteTask(id: number): Promise<AxiosResponse<{}>> {
    return instance.delete(`${ServicePath.tasks}/${id}`)
  }

  static async deleteBoard(id: number): Promise<AxiosResponse<{}>> {
    return instance.delete(`${ServicePath.boards}/${id}`)
  }

  static async deleteCard(id: number): Promise<AxiosResponse<{}>> {
    return instance.delete(`${ServicePath.cards}/${id}`)
  }

  static async changeCardTitle(id: number, title: string): Promise<AxiosResponse<CardType>> {
    return instance.patch(`${ServicePath.cards}/${id}`, { title })
  }
}

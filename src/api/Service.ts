import axios, { AxiosResponse } from 'axios'
import { PostType } from '../types/PostType'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {},
})

export class Service {
  static async getPost(id: number): Promise<AxiosResponse<PostType>> {
    return instance.get(`/posts/${id}`)
  }
}

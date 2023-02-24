import React from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'

export const Board = () => {
  const { id } = useParams()

  const board = useAppSelector(state => state.board.find(f => f.id === +id!)) // how to avoid undefined properly ?

  return (
    <>
      <div>id: {id}</div>
      <div>board title: {board?.title || 'no board with this id'}</div>
    </>
  )
}

import React, { useState } from 'react'
import { fetchPosts, TestReducerStateType } from './store/reducers/testReducer'
import { LinearProgress } from '@mui/material'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { Post } from './components/Post'

export const App = () => {
  const { posts, isLoading } = useAppSelector<TestReducerStateType>(state => state.test)
  const dispatch = useAppDispatch()

  const [id, setId] = useState<number>(1)

  const onClickHandler = () => {
    dispatch(fetchPosts({ isLoading: true, id }))
    setId(id + 1)
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      <button onClick={onClickHandler}>GET NEXT POST</button>
      <div>
        {posts.map(m => (
          <Post key={m.id} body={m.body} title={m.title} />
        ))}
      </div>
    </div>
  )
}

import React, { FC } from 'react'

type PostPropsType = {
  title: string
  body: string
}

export const Post: FC<PostPropsType> = ({ body, title }) => {
  return (
    <>
      <div>{title}</div>
      <div>{body}</div>
    </>
  )
}

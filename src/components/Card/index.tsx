import React, { FC, memo } from 'react'

import styled from 'styled-components'

import { Tasks } from '../Tasks'

type CardPropsType = {
  id: number
  title: string
}

export const Card: FC<CardPropsType> = memo(({ id, title }) => {
  return (
    <CardContent>
      <StyledTitle>card: {title}</StyledTitle>
      <Tasks cardId={id} />
    </CardContent>
  )
})

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`
export const StyledTitle = styled.h3``

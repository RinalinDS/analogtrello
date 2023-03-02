import React, { FC, memo } from 'react'

import styled from 'styled-components'

import { Tasks } from '../Tasks'

type CardPropsType = {
  id: number
  title: string
}

export const Card: FC<CardPropsType> = memo(({ id, title }) => {
  return (
    <StyledDiv>
      <StyledTitle>card: {title}</StyledTitle>
      <Tasks cardId={id} />
    </StyledDiv>
  )
})

export const StyledDiv = styled.div``
export const StyledTitle = styled.h3``

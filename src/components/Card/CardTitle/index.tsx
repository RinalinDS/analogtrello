import React, { FC } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

type PropsType = {
  title: string
  callback: () => void
}

export const CardTitle: FC<PropsType> = ({ title, callback }) => {
  return (
    <StyledTitle>
      <Text>{title}</Text>
      <StyledIconButton onClick={callback}>
        <CloseSharpIcon />
      </StyledIconButton>
    </StyledTitle>
  )
}

export const StyledTitle = styled.h3`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledIconButton = styled(IconButton)`
  & > svg {
    font-size: 2rem;
  }
`
const Text = styled.span``

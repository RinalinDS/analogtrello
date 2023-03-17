import React, { FC, memo, MouseEvent, useCallback } from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { StyledIconButton } from '../../../common/shared/style'
import { EditableTextWithTextArea } from '../../../common/EditableTitle/EditableTextWithTextArea'

type PropsType = {
  title: string
  deleteCard: () => void
  changeTitle: (title: string) => void
}

export const CardTitle: FC<PropsType> = memo(({ title, deleteCard, changeTitle }) => {
  const deleteCardHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      deleteCard()
    },
    [deleteCard],
  )

  return (
    <StyledCardTitle>
      <EditableTextWithTextArea text={title} changeText={changeTitle} />
      <StyledIconButton onClick={deleteCardHandler}>
        <CloseSharpIcon />
      </StyledIconButton>
    </StyledCardTitle>
  )
})

const StyledCardTitle = styled.h3`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
`

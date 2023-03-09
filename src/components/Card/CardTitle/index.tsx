import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

type PropsType = {
  title: string
  callback: () => void
  changeTitle: (title: string) => void
}

export const CardTitle: FC<PropsType> = memo(({ title, callback, changeTitle }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newTitle, setTitle] = useState<string>(title)

  const onInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }, [])

  const onBlurHandler = useCallback(() => {
    setEdit(false)
    if (newTitle !== title) {
      newTitle && changeTitle(newTitle)
    }
  }, [newTitle, changeTitle, title])

  const onClickHandler = useCallback(() => setEdit(true), [])

  return (
    <StyledTitle onClick={onClickHandler}>
      {edit ? (
        <StyledTextarea
          value={newTitle}
          onChange={onInputChange}
          spellCheck={false}
          onBlur={onBlurHandler}
          autoFocus
        />
      ) : (
        <Text>{title}</Text>
      )}
      <StyledIconButton onClick={callback}>
        <CloseSharpIcon />
      </StyledIconButton>
    </StyledTitle>
  )
})

export const StyledTitle = styled.h3`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 3px;
  border: none;
  display: block;
  outline: none;
  font-family: sans-serif;
  font-size: inherit;
  font-weight: inherit;
  box-shadow: inset 0 0 0 2px #0079bf;
  padding: 0.4rem 0.8rem;
  min-height: 1rem;
`

export const StyledIconButton = styled(IconButton)`
  & > svg {
    font-size: 2rem;
  }
`
const Text = styled.span`
  word-break: break-word;
`

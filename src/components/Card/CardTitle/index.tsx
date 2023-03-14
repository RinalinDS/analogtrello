import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { StyledIconButton, Text } from '../../../common/shared/style'

type PropsType = {
  title: string
  deleteCard: () => void
  changeTitle: (title: string) => void
}

export const CardTitle: FC<PropsType> = memo(({ title, deleteCard, changeTitle }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newTitle, setTitle] = useState<string>(title)

  const changeTitleHandler = useCallback(() => {
    if (newTitle !== title) {
      const trimmedNewTitle = newTitle.trim()
      trimmedNewTitle && changeTitle(trimmedNewTitle)
    }
    if (!newTitle.trim()) {
      setTitle(title)
    }
  }, [newTitle, changeTitle, title])

  const onInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }, [])

  const openEdit = useCallback(() => setEdit(true), [])
  const closeEdit = useCallback(() => setEdit(false), [])

  const onBlurHandler = useCallback(() => {
    closeEdit()
    changeTitleHandler()
  }, [changeTitleHandler, closeEdit])

  const deleteCardHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      deleteCard()
    },
    [deleteCard],
  )

  const escapeAndEnterHandler = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Escape') {
        closeEdit()
        setTitle(title)
      }
      if (e.key === 'Enter') {
        closeEdit()
        changeTitleHandler()
      }
    },
    [changeTitleHandler, closeEdit, title],
  )

  return (
    <StyledTitle onClick={openEdit}>
      {edit ? (
        <StyledTextarea
          value={newTitle}
          onChange={onInputChange}
          spellCheck={false}
          onBlur={onBlurHandler}
          autoFocus
          onKeyDown={escapeAndEnterHandler}
        />
      ) : (
        <Text>{title}</Text>
      )}
      <StyledIconButton onClick={deleteCardHandler}>
        <CloseSharpIcon />
      </StyledIconButton>
    </StyledTitle>
  )
})

const StyledTitle = styled.h3`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
`

const StyledTextarea = styled.textarea`
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

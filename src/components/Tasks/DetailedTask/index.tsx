import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react'

import styled from 'styled-components'

import { TaskType } from '../../../types/BoardsType'
import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  StyledTextarea,
  SubmitButton,
} from '../../../common/shared/style'

type DetailedTaskProps = {
  task: TaskType
  changeTitle: (title: string) => void
  changeDescription: (description: string) => void
}

export const DetailedTask: FC<DetailedTaskProps> = memo(
  ({ task, changeTitle, changeDescription }) => {
    const { title, description } = task

    const [editTitle, setEditTitle] = useState<boolean>(false)
    const [editDescription, setEditDescription] = useState<boolean>(false)
    const [newTitle, setTitle] = useState<string>(title)
    const [newDescription, setDescription] = useState<string>(description)

    const changeTitleHandler = useCallback(() => {
      if (newTitle !== title) {
        const trimmedNewTitle = newTitle.trim()
        trimmedNewTitle && changeTitle(trimmedNewTitle)
      }
      if (!newTitle.trim()) {
        setTitle(title)
      }
    }, [newTitle, changeTitle, title])

    const changeDescriptionHandler = useCallback(() => {
      if (newDescription !== description) {
        const trimmedNewDescription = newDescription.trim()
        trimmedNewDescription && changeDescription(trimmedNewDescription)
      }
      if (!newDescription.trim()) {
        setDescription(description)
      }
    }, [newDescription, changeDescription, description])

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }, [])

    const onTextAreaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.currentTarget.value)
    }, [])

    const openEdit = useCallback(() => setEditTitle(true), [])
    const closeEdit = useCallback(() => setEditTitle(false), [])

    const openEditDescription = useCallback(() => setEditDescription(true), [])
    const closeEditDescription = useCallback(() => setEditDescription(false), [])

    const onBlurHandler = useCallback(() => {
      closeEdit()
      changeTitleHandler()
    }, [changeTitleHandler, closeEdit])

    const onTextAreaBlurHandler = useCallback(() => {
      closeEditDescription()
      changeDescriptionHandler()
    }, [changeDescriptionHandler, closeEditDescription])

    const escapeAndEnterHandler = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
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

    const textAreaEscapeAndEnterHandler = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        e.stopPropagation()

        if (e.key === 'Escape') {
          closeEditDescription()
          setDescription(description)
        }
        if (e.key === 'Enter') {
          closeEditDescription()
          changeDescriptionHandler()
        }
      },
      [changeDescriptionHandler, closeEditDescription, description],
    )
    return (
      <StyledContainer>
        <StyledTitleContainer>
          {editTitle ? (
            <StyledInput
              value={newTitle}
              onChange={onInputChange}
              spellCheck={false}
              onBlur={onBlurHandler}
              autoFocus
              onKeyDown={escapeAndEnterHandler}
            />
          ) : (
            <StyledTitle onClick={openEdit}>{title}</StyledTitle>
          )}
        </StyledTitleContainer>
        <header>тут будет кард тайтл</header>
        <Flex>
          <span>Description</span>
          {description && !editDescription && (
            <ConfirmButton onClick={openEditDescription}>Edit</ConfirmButton>
          )}
        </Flex>
        {!description && !editDescription && (
          <BlankSpace onClick={openEditDescription}>Add More detailed description...</BlankSpace>
        )}
        {editDescription ? (
          <>
            <StyledTextarea
              value={newDescription}
              onChange={onTextAreaChange}
              spellCheck={false}
              onBlur={onTextAreaBlurHandler}
              autoFocus
              onKeyDown={textAreaEscapeAndEnterHandler}
            />
            <ButtonContainer>
              <SubmitButton onClick={changeDescriptionHandler}>Save</SubmitButton>
              <CancelButton onClick={closeEditDescription}>Cancel</CancelButton>
            </ButtonContainer>
          </>
        ) : (
          <StyledTitle onClick={openEditDescription}>{description}</StyledTitle>
        )}
      </StyledContainer>
    )
  },
)

const BlankSpace = styled.p`
  background-color: #091e420a;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  color: inherit;
  min-height: 6rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.6rem 7.2rem;
  width: 60rem;
  height: 60%;
`

const Flex = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-start;
`

const StyledTitleContainer = styled.div`
  margin-bottom: 1rem;
`

const StyledTitle = styled.span`
  display: block;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  margin: 0;
  padding: 0.6rem 0.4rem;
  font-weight: 600;
`

const StyledInput = styled.input`
  box-sizing: border-box;
  resize: none;
  border-radius: 3px;
  border: none;
  display: block;
  outline: none;
  font-family: sans-serif;
  box-shadow: inset 0 0 0 2px #0079bf;
  padding: 0.6rem 0.4rem;
  font-weight: 600;
  font-size: 1.8rem;
  width: 100%;
`

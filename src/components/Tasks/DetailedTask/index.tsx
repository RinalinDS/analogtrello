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

import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  StyledEditableText,
  StyledInput,
  StyledText,
  StyledTextarea,
  SubmitButton,
} from '../../../common/shared/style'

type DetailedTaskProps = {
  changeTitle: (title: string) => void
  changeDescription: (description: string) => void
  cardTitle: string
  title: string
  description: string
}

export const DetailedTask: FC<DetailedTaskProps> = memo(
  ({ changeTitle, changeDescription, cardTitle, description, title }) => {
    const [editTitle, setEditTitle] = useState<boolean>(false)
    const [editDescription, setEditDescription] = useState<boolean>(false)
    const [newTitle, setTitle] = useState<string>(title)
    const [newDescription, setDescription] = useState<string>(description)

    const changeTitleHandler = useCallback(() => {
      const trimmedNewTitle = newTitle.trim()
      if (trimmedNewTitle !== title) {
        trimmedNewTitle && changeTitle(trimmedNewTitle)
      }
      if (!trimmedNewTitle) {
        setTitle(title)
      }
    }, [newTitle, changeTitle, title])

    const changeDescriptionHandler = useCallback(() => {
      const trimmedNewDescription = newDescription.trim()
      if (trimmedNewDescription !== description) {
        changeDescription(trimmedNewDescription)
      }
    }, [newDescription, changeDescription, description])

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }, [])

    const onTextAreaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.currentTarget.value)
    }, [])

    const openTitleEdit = useCallback(() => setEditTitle(true), [])
    const closeTitleEdit = useCallback(() => setEditTitle(false), [])

    const openEditDescription = useCallback(() => setEditDescription(true), [])
    const closeEditDescription = useCallback(() => setEditDescription(false), [])

    const cancelDescriptionHandler = useCallback(() => {
      closeEditDescription()
      setDescription(description)
    }, [closeEditDescription, setDescription, description])

    const onBlurHandler = useCallback(
      (e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>) => {
        if (e.target.localName === 'input') {
          closeTitleEdit()
          changeTitleHandler()
        }
        if (e.target.localName === 'textarea') {
          closeEditDescription()
          changeDescriptionHandler()
        }
      },
      [changeTitleHandler, closeTitleEdit, closeEditDescription, changeDescriptionHandler],
    )

    const escapeAndEnterHandler = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
          if (e.currentTarget.localName === 'textarea') {
            cancelDescriptionHandler()
          }
          if (e.currentTarget.localName === 'input') {
            closeTitleEdit()
            setTitle(title)
          }
        }
        if (e.key === 'Enter') {
          if (e.currentTarget.localName === 'textarea') {
            closeEditDescription()
            changeDescriptionHandler()
          }
          if (e.currentTarget.localName === 'input') {
            closeTitleEdit()
            changeTitleHandler()
          }
        }
      },
      [
        changeDescriptionHandler,
        closeEditDescription,
        closeTitleEdit,
        cancelDescriptionHandler,
        changeTitleHandler,
        title,
      ],
    )

    const preventDefaultHandler = useCallback((e: MouseEvent) => {
      e.preventDefault()
    }, [])

    return (
      <DetailedTaskContainer>
        <TitleContainer>
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
            <StyledEditableText onClick={openTitleEdit}>{title}</StyledEditableText>
          )}
          <GreySmallText>
            in list <UnderlinedText>{cardTitle}</UnderlinedText>
          </GreySmallText>
        </TitleContainer>
        <FlexContainer>
          <StyledText>Description</StyledText>
          {description && !editDescription && (
            <ConfirmButton onClick={openEditDescription}>Edit</ConfirmButton>
          )}
        </FlexContainer>
        {!description && !editDescription && (
          <BlankSpace onClick={openEditDescription}>Add More detailed description...</BlankSpace>
        )}
        <DescriptionContainer>
          {editDescription ? (
            <>
              <StyledTextarea
                value={newDescription}
                onChange={onTextAreaChange}
                spellCheck={false}
                onBlur={onBlurHandler}
                autoFocus
                onKeyDown={escapeAndEnterHandler}
              />
              <ButtonContainer>
                <SubmitButton onClick={changeDescriptionHandler}>Save</SubmitButton>
                <CancelButton
                  onClick={cancelDescriptionHandler}
                  onMouseDown={preventDefaultHandler}
                >
                  Cancel
                </CancelButton>
              </ButtonContainer>
            </>
          ) : (
            <StyledEditableText $isForDescription onClick={openEditDescription}>
              {description}
            </StyledEditableText>
          )}
        </DescriptionContainer>
      </DetailedTaskContainer>
    )
  },
)

const DetailedTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem 3.2rem 1.6rem 1.6rem;
  width: 60rem;
  min-height: 40rem;
`

const TitleContainer = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`

const DescriptionContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
`
const FlexContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  font-size: 1.8rem;
  font-weight: 600;
`

const BlankSpace = styled.p`
  background-color: #091e420a;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  color: inherit;
  min-height: 6rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const GreySmallText = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  color: #888;
  padding: 0 0.4rem;
`

const UnderlinedText = styled.span`
  text-decoration: underline;
`

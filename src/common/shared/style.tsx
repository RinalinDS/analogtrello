import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import { Field } from 'formik'

export const StyledIconButton = styled(IconButton)`
  & > svg {
    font-size: 2.4rem;
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

export const ConfirmButton = styled.button`
  border: none;
  background: #eee;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  display: inline-block;
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`
export const StyledField = styled(Field)`
  background-color: #fff;
  display: block;
  margin: 0;
  width: 100%;
  outline: none;
  padding: 8px 12px;
  line-height: 20px;
  border: none;
  border-radius: 3px;
  resize: vertical;
  min-height: 4rem;
  max-height: 12rem;
  box-shadow: inset 0 0 0 2px #0079bf;
`
export const Button = styled.button`
  height: 3.2rem;
  border: none;
  box-shadow: none;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
`

export const SubmitButton = styled(Button)`
  background-color: #0079bf;
  color: #fff;
  border-radius: 3px;
  padding: 0.6rem 1.2rem;

  &:disabled {
    background-color: #5f8e9b;
  }
`

export const CancelButton = styled(Button)`
  background: none;
  padding: 0.3rem;

  & > svg {
    font-size: 2.8rem;
    color: #333;
  }

  &:hover {
    background-color: #091e4214;
    border: none;
    box-shadow: none;
  }
`

export const AddItemContainer = styled.div<{ $isForAddingCard?: boolean }>`
  min-height: 3.2rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 3px;
  width: ${props => (props.$isForAddingCard ? '20rem' : '100%')};
  background: ${props => (props.$isForAddingCard ? 'rgba(152, 149, 149, 0.47)' : 'inherit')};
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  resize: vertical;
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
  max-height: 40rem;
  height: auto;
`

export const StyledInput = styled.input`
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

export const Text = styled.span<{ whiteText?: boolean }>`
  color: ${props => (props.whiteText ? '#fff' : 'inherit')};
  word-break: break-word;
`

export const StyledText = styled(Text)`
  display: block;
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  padding: 0.6rem 0.4rem;
`

export const StyledEditableText = styled(StyledText)<{ $isForDescription?: boolean }>`
  padding: ${props => (props.$isForDescription ? '0.4rem 0.8rem' : '0.6rem 0.4rem')};
  cursor: pointer;
  width: 100%;
`

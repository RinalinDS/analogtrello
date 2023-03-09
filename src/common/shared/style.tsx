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

export const Text = styled.span<{ whiteText?: boolean }>`
  color: ${props => (props.whiteText ? '#fff' : 'inherit')};
  word-break: break-word;
`

export const ConfirmButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  display: inline-block;
  width: 100%;
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

  & > svg {
    font-size: 2.8rem;
    color: #333;
  }
`

export const AddItemContainer = styled.div<{ list?: boolean }>`
  min-height: 3.2rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 3px;
  width: ${props => (props.list ? '20rem' : '100%')};
  background: ${props => (props.list ? 'rgba(152, 149, 149, 0.47)' : 'inherit')};
`

import React, { FC, memo, useCallback, useState } from 'react'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

type AddItemFormPropsType = {
  callBack: (title: string) => void
  label: string
  isListEmpty: boolean
}

const schema = Yup.object().shape({
  title: Yup.string().trim().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const AddTaskForm: FC<AddItemFormPropsType> = memo(({ callBack, label, isListEmpty }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const closeForm = useCallback(() => setEdit(false), [])
  const openForm = useCallback(() => setEdit(true), [])

  return edit ? (
    <Formik
      initialValues={{
        title: '',
      }}
      onSubmit={(values, { resetForm }) => {
        callBack(values.title)
        resetForm()
        closeForm()
      }}
      validationSchema={schema}
    >
      {({ values, errors }) => (
        <StyledForm>
          <StyledField name="title" placeholder={label} component={'textarea'} autocomplete="off" />
          <ButtonContainer>
            <SubmitButton disabled={!values.title || !!errors.title} type={'submit'}>
              Add task
            </SubmitButton>
            <CancelButton type={'button'} onClick={closeForm}>
              <CloseSharpIcon fontSize={'large'} />
            </CancelButton>
          </ButtonContainer>
        </StyledForm>
      )}
    </Formik>
  ) : (
    <StyledDiv onClick={openForm}>
      <StyledSpan>&#43; Add card</StyledSpan>
    </StyledDiv>
  )
})

export const StyledForm = styled(Form)`
  background: inherit;
  width: 100%;
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
`
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
export const StyledSpan = styled.span`
  color: inherit;
`
export const StyledDiv = styled.div`
  min-height: 3.2rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 3px;
  width: 100%;
  background-color: inherit;
`

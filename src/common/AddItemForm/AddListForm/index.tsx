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

export const AddListForm: FC<AddItemFormPropsType> = memo(({ callBack, label, isListEmpty }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const closeForm = useCallback(() => setEdit(false), [])
  const openForm = useCallback(() => setEdit(true), [])
  const addBtnText = isListEmpty ? 'Add a list' : 'Add another list'
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
          <StyledField name="title" placeholder={label} />
          <ButtonContainer>
            <SubmitButton disabled={!values.title || !!errors.title} type={'submit'}>
              Add list
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
      <StyledSpan>&#43; {addBtnText}</StyledSpan>
    </StyledDiv>
  )
})

export const StyledForm = styled(Form)`
  background-color: rgba(152, 149, 149, 0.47);
  padding: 0.6rem;
  width: 20rem;
`

export const StyledField = styled(Field)`
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  width: 100%;
  outline: none;
  padding: 8px 12px;
  line-height: 20px;
  border: none;
  border-radius: 3px;
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
  color: #fff;
`
export const StyledDiv = styled.div`
  min-height: 3.2rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 3px;
  width: 20rem;
  background-color: rgba(152, 149, 149, 0.47);
`

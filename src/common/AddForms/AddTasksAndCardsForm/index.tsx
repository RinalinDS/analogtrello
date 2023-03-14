import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import styled from 'styled-components'

import {
  AddItemContainer,
  ButtonContainer,
  CancelButton,
  StyledField,
  SubmitButton,
  Text,
} from '../../shared/style'

type AddTasksAndCardsFormPropsType = {
  callBack: (title: string) => void
  label: string
  submitBtnText: string
  btnText: string
  component: string
  isForAddingCard?: boolean
  id?: number
}

const schema = Yup.object().shape({
  title: Yup.string().trim().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const AddTasksAndCardsForm: FC<AddTasksAndCardsFormPropsType> = memo(
  ({ callBack, label, component, submitBtnText, isForAddingCard, btnText, id }) => {
    const [edit, setEdit] = useState<boolean>(false)
    const closeForm = useCallback(() => setEdit(false), [])
    const openForm = useCallback(() => setEdit(true), [])

    useEffect(() => {
      setEdit(false)
    }, [id])

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
          <StyledForm $isForAddingCard={isForAddingCard}>
            <StyledField
              name="title"
              placeholder={label}
              component={component}
              autoComplete={'off'}
            />
            <ButtonContainer>
              <SubmitButton disabled={!values.title || !!errors.title} type={'submit'}>
                {submitBtnText}
              </SubmitButton>
              <CancelButton type={'button'} onClick={closeForm}>
                <CloseSharpIcon fontSize={'large'} />
              </CancelButton>
            </ButtonContainer>
          </StyledForm>
        )}
      </Formik>
    ) : (
      <AddItemContainer onClick={openForm} $isForAddingCard={isForAddingCard}>
        <Text whiteText={isForAddingCard}>&#43; {btnText}</Text>
      </AddItemContainer>
    )
  },
)

const StyledForm = styled(Form)<{ $isForAddingCard?: boolean }>`
  padding: ${props => (props.$isForAddingCard ? '0.6rem' : '')};
  width: ${props => (props.$isForAddingCard ? '20rem' : '100%')};
  background: ${props => (props.$isForAddingCard ? 'rgba(152, 149, 149, 0.47)' : 'inherit')};
`

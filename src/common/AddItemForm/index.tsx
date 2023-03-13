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
} from '../shared/style'

type AddItemFormPropsType = {
  callBack: (title: string) => void
  label: string
  submitBtnText: string
  btnText: string
  component: string
  list?: boolean
  id?: number
}

const schema = Yup.object().shape({
  title: Yup.string().trim().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const AddItemForm: FC<AddItemFormPropsType> = memo(
  ({ callBack, label, component, submitBtnText, list, btnText, id }) => {
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
          <StyledForm list={!!list}>
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
      <AddItemContainer onClick={openForm} list={!!list}>
        <Text whiteText={!!list}>&#43; {btnText}</Text>
      </AddItemContainer>
    )
  },
)

const StyledForm = styled(Form)<{ list?: boolean }>`
  padding: ${props => (props.list ? '0.6rem' : '')};
  width: ${props => (props.list ? '20rem' : '100%')};
  background: ${props => (props.list ? 'rgba(152, 149, 149, 0.47)' : 'inherit')};
`

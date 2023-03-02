import React, { FC, memo } from 'react'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import styled from 'styled-components'

type AddItemFormPropsType = {
  callBack: (title: string) => void
  label: string
}

const SignupSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ callBack, label }) => {
  return (
    <Formik
      initialValues={{
        title: '',
      }}
      onSubmit={(values, { resetForm }) => {
        callBack(values.title)
        resetForm()
      }}
      validationSchema={SignupSchema}
    >
      {({ values, errors }) => (
        <StyledForm>
          <Field name="title" placeholder={label} />
          <StyledButton disabled={!values.title || !!errors.title} type={'submit'}>
            create
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  )
})

export const StyledForm = styled(Form)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export const StyledButton = styled.button``

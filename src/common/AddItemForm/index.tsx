import React, { FC, memo } from 'react'
import { TextField } from '@mui/material'

import { useFormik } from 'formik'

import styled from 'styled-components'

type AddItemFormPropsType = {
  callBack: (title: string) => void
  label?: string
}

type ErrorsType = {
  title: string
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ callBack, label }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validate: values => {
      const errors = {} as ErrorsType
      if (!values.title) {
        errors.title = 'Title is required'
      }
      return errors
    },
    onSubmit: values => {
      callBack(values.title)
      formik.resetForm()
    },
  })

  const { onChange, value, name } = formik.getFieldProps('title')
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledTextField
        name={name}
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!formik.errors.title}
        label={label}
        helperText={formik.errors.title}
      />
      <StyledButton disabled={!value} type={'submit'}>
        create
      </StyledButton>
    </StyledForm>
  )
})

export const StyledForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export const StyledTextField = styled(TextField)`
  & label,
  & input,
  & span {
    font-size: 1.6rem;
  }

  & p {
    font-size: 0.9rem;
  }
`

export const StyledButton = styled.button``

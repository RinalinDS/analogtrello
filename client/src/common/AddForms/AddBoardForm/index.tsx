import { FC, memo, useState } from 'react'
import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import styled from 'styled-components'

import { StyledField } from '../../shared/style'

import { ColorPicker } from './ColorPicker'

type Props = {
  callBack: (title: string, color: string) => void
  label: string
}

const colors: { hex: string; color: string }[] = [
  {
    hex: 'rgb(0, 121, 191)',
    color: 'blue',
  },
  {
    hex: 'rgb(210, 144, 52)',
    color: 'orange',
  },
  {
    hex: 'rgb(81, 152, 57)',
    color: 'green',
  },
  {
    hex: 'rgb(176, 70, 50)',
    color: 'brown',
  },
  {
    hex: 'rgb(137, 96, 158)',
    color: 'purple',
  },
  {
    hex: 'rgb(205, 90, 145)',
    color: 'pink',
  },
]

const schema = Yup.object().shape({
  title: Yup.string().trim().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const AddBoardForm: FC<Props> = memo(({ callBack, label }) => {
  const [activeColor, setActiveColor] = useState<number>(0)

  const submitForm = (title: string) => {
    callBack(title, colors[activeColor].hex)
  }

  return (
    <>
      <ColorPicker colors={colors} activeColor={activeColor} setActiveColor={setActiveColor} />
      <Formik
        initialValues={{
          title: '',
        }}
        onSubmit={(values, { resetForm }) => {
          submitForm(values.title)
          resetForm()
        }}
        validationSchema={schema}
      >
        {({ values, errors }) => (
          <StyledForm>
            <StyledField name="title" placeholder={label} />
            <CreateButton disabled={!values.title || !!errors.title} type={'submit'}>
              Create
            </CreateButton>
          </StyledForm>
        )}
      </Formik>
    </>
  )
})

const StyledForm = styled(Form)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
`

const CreateButton = styled.button`
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;

  font-size: 1.4rem;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0.8rem 1.6rem;
  text-decoration: none;
  white-space: normal;
  transition: all 0.4 ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: rgba(9, 30, 66, 0.04);
    box-shadow: none;
    border: none;
    color: #a5adba;
    cursor: not-allowed;
  }
`

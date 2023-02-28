import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'
import { TextField } from '@mui/material'

import styles from './AddItemForm.module.css'

type AddItemFormPropsType = {
  callBack: (title: string) => void
  disabled?: boolean
  label?: string
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ callBack, disabled, label }) => {
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSetNewTitleHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setNewTitle(e.currentTarget.value)

  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addItem()
    }
  }
  const addItem = (): void => {
    const title = newTitle.trim()
    if (title) {
      callBack(title)
      setNewTitle('')
      setError(null)
    } else {
      setError('Title is required')
    }
  }

  return (
    <div className={styles.container}>
      <TextField
        className={styles.textField}
        variant="outlined"
        value={newTitle}
        onChange={onSetNewTitleHandler}
        onKeyDown={onEnterKeyPressHandler}
        error={!!error}
        label={label}
        helperText={error}
        disabled={disabled}
      />
      <button disabled={!newTitle.trim()} onClick={addItem}>
        create
      </button>
    </div>
  )
})

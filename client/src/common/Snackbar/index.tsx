import React, { FC, memo, useCallback, useEffect, useState } from 'react'

import { Alert, Stack } from '@mui/material'

import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

import { useAppSelector } from '../../hooks/useAppSelector'
import { selectMessages } from '../../store/selectors/snackbarSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { removeMessage } from '../../store/reducers/snackbarReducer'

type AlertProps = {
  id: string
  type: 'error' | 'success'
  callback: (id: string) => void
  text: string
}

const CustomAlert: FC<AlertProps> = memo(({ id, type, callback, text }) => {
  const [timeoutId, setTimeoutId] = useState<TimeoutId>()

  useEffect(() => {
    if (type === 'success') {
      setTimeoutId(
        setTimeout(function () {
          callback(id)
        }, 5000),
      )
    }
  }, [id, callback, type])

  const handleAlertClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      callback(id)
      clearTimeout(timeoutId)
    },
    [id, callback, timeoutId],
  )

  return (
    <Alert
      sx={{ fontSize: '1.4rem' }}
      onClose={handleAlertClose}
      elevation={6}
      variant="filled"
      severity={type}
    >
      {text}
    </Alert>
  )
})

export const Snackbar = memo(() => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(selectMessages)
  const deleteMsg = useCallback((id: string) => dispatch(removeMessage(id)), [dispatch])
  return (
    <Stack sx={{ position: 'absolute', bottom: 24, right: 24 }} spacing={2}>
      {messages.map(message => (
        <CustomAlert
          id={message.id}
          type={message.severity}
          key={message.id}
          callback={deleteMsg}
          text={message.message}
        />
      ))}
    </Stack>
  )
})

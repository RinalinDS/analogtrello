import React, { FC, useCallback, useEffect } from 'react'

import { Alert, Stack } from '@mui/material'

import { useAppSelector } from '../hooks/useAppSelector'
import { removeMessage } from '../store/reducers/appReducer'
import { MessageType } from '../types/MessageType'
import { selectMessages } from '../store/selectors/appSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'

const CustomAlert: FC<{ message: MessageType }> = ({ message }) => {
  const dispatch = useAppDispatch()

  const handleAlertClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      dispatch(removeMessage(message.id))
    },
    [message, dispatch],
  )

  useEffect(() => {
    if (message.severity === 'success') {
      setTimeout(function () {
        dispatch(removeMessage(message.id))
      }, 5000)
    }
  }, [message, dispatch])

  return (
    <Alert
      sx={{ fontSize: '1.4rem' }}
      onClose={handleAlertClose}
      elevation={6}
      variant="filled"
      severity={message.severity}
    >
      {message.message}
    </Alert>
  )
}

export const Snackbar = () => {
  const messages = useAppSelector(selectMessages)
  return (
    <Stack sx={{ position: 'absolute', bottom: 24, right: 24 }} spacing={2}>
      {messages.map(message => (
        <CustomAlert message={message} key={message.id} />
      ))}
    </Stack>
  )
}

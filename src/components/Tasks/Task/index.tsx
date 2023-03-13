import React, { FC, memo, MouseEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'

import { StyledIconButton, Text } from '../../../common/shared/style'
import { TaskType } from '../../../types/BoardsType'
import { deleteTask } from '../../../store/reducers/tasksReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { Modal } from '../../../common/Modal'
import { SecondModal } from '../../../common/Modal/ModalSecond'

type TaskPropsType = {
  task: TaskType
}

export const Task: FC<TaskPropsType> = ({ task }) => {
  const dispatch = useAppDispatch()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleModal = (e: MouseEvent) => {
    e.stopPropagation()
    setIsVisible(true)
  }

  const { id, title, cardId } = task

  const onDeleteButtonClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      dispatch(deleteTask({ id, cardId }))
    },
    [cardId, dispatch, id],
  )

  return (
    <Item onClick={toggleModal}>
      <TextTask>{title}</TextTask>
      <StyledIconButton onClick={onDeleteButtonClick}>
        <CloseSharpIcon />
      </StyledIconButton>
      <Modal setIsModalVisible={setIsVisible} visible={isVisible}>
        <div>IT'S A DISASTAH</div>
      </Modal>
    </Item>
  )
}

export const TextTask = styled(Text)`
  padding-right: 5rem;
`

export const Item = styled.div`
  background: white;
  word-wrap: break-word;
  color: #172b4d;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  min-height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    display: none;
    padding: 0;
  }

  &:hover button {
    display: inline-flex;
  }
`

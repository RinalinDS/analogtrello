import React, { FC, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { ServicePath } from '../../../enums/ServicePath'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setCurrentBoardId } from '../../../store/reducers/boardsReducer'
import { BasicMenu } from '../../../common/Menu'
import { LabelMessage } from '../../../enums/Message'

type PropsType = {
  active: boolean
  id: number
  title: string
  onDeleteButtonClick: (id: number) => void
}

export const BoardLink: FC<PropsType> = memo(({ active, id, title, onDeleteButtonClick }) => {
  const dispatch = useAppDispatch()

  const deleteClickHandler = useCallback(() => {
    onDeleteButtonClick(id)
  }, [id, onDeleteButtonClick])

  const onClickHandler = () => dispatch(setCurrentBoardId({ id: +id }))

  return (
    <Item active={active}>
      <Link to={`${ServicePath.boards}/${id}`} onClick={onClickHandler}>
        {title}
      </Link>
      <BasicMenu menuList={{ onClick: deleteClickHandler, title: LabelMessage.DeleteBoard }} />
    </Item>
  )
})

export const Item = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ active }) => (active ? 'rgba(173, 216, 230, 0.6)' : '')};
  position: relative;

  &:hover {
    background: rgba(173, 216, 230, 0.35);
  }
`

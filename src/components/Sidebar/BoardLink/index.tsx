import React, { FC, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import IconButton from '@mui/material/IconButton'

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
  // const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
  //
  // const activateDeleteModal = useCallback(() => setIsDeleteModalActive(true), [])
  // const deActivateDeleteModal = useCallback(() => setIsDeleteModalActive(false), [])

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
export const StyledIconButton = styled(IconButton)`
  position: relative;

  &:hover {
    background: rgba(126, 213, 111, 0.8);
  }

  & > svg {
    font-size: 2.4rem;
  }
`

export const ConfirmButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`

export const ModalCloseButton = styled.button`
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
`

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 0.8rem 1.6rem;
`
export const StyledSpan = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: center;
`

export const StyledDiv = styled.div`
  color: #333333;
  min-width: 20rem;
`

import React, { FC, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import MenuItem from '@mui/material/MenuItem'

import { ServicePath } from '../../../enums/ServicePath'
import { BasicMenu } from '../../../common/Menu'
import { LabelMessage } from '../../../enums/Message'

type PropsType = {
  active: boolean
  id: number
  title: string
  onDeleteButtonClick: (id: number) => void
}

export const BoardLink: FC<PropsType> = memo(({ active, id, title, onDeleteButtonClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const deleteClickHandler = useCallback(() => {
    onDeleteButtonClick(id)
    setAnchorEl(null)
  }, [id, onDeleteButtonClick])

  return (
    <Item isActive={active}>
      <Link to={`${ServicePath.boards}/${id}`}>{title}</Link>
      <BasicMenu iconType={'more'} setAnchorEl={setAnchorEl} anchorEl={anchorEl}>
        <StyledMenuItem onClick={deleteClickHandler}>{LabelMessage.DeleteBoard}</StyledMenuItem>
      </BasicMenu>
    </Item>
  )
})

export const Item = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ isActive }) => (isActive ? 'rgba(173, 216, 230, 0.6)' : '')};
  position: relative;

  &:hover {
    background: rgba(173, 216, 230, 0.35);
  }
`

const StyledMenuItem = styled(MenuItem)`
  div & {
    font-size: 1.4rem;
  }
`

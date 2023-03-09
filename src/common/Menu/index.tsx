import * as React from 'react'
import { FC, memo } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'

import { LabelMessage } from '../../enums/Message'
import { AddItemForm } from '../AddItemForm/AddBoardForm'

type menuType = {
  onClick: () => void
  title: string
}

export const BasicMenu: FC<{
  menuList?: menuType
  children?: React.ReactNode
  plus?: boolean
  addBoardHandler?: (title: string, color: string) => void
}> = memo(({ menuList, children, plus, addBoardHandler }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const onClickHandler = () => {
    handleClose()
    menuList?.onClick()
  }

  const addBoard = (title: string, color: string) => {
    addBoardHandler && addBoardHandler(title, color)
    handleClose()
  }
  return (
    <div>
      <StyledBtn
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {plus ? (
          <StyledAddIcon fontSize={'large'} color={'action'} />
        ) : (
          <StyledMoreIcon fontSize={'large'} color={'action'} />
        )}
      </StyledBtn>
      <StyledMenu
        plus={plus}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem onClick={onClickHandler}>{menuList?.title}</StyledMenuItem>
        {plus && <AddItemForm callBack={addBoard} label={LabelMessage.BoardTitle} />}
      </StyledMenu>
    </div>
  )
})

const StyledBtn = styled(Button)`
  cursor: pointer;

  &:hover {
    background: rgba(126, 213, 111, 0.8) !important;
    border-radius: 9px;
  }

  & > svg {
    font-size: 2.4rem;
  }
`
const StyledMenu = styled(Menu)<{ plus: boolean | undefined }>`
  padding: ${({ plus }) => (plus ? '2rem' : '')};
  z-index: 5;
`

const StyledMoreIcon = styled(MoreHorizIcon)``
const StyledAddIcon = styled(AddIcon)``
const StyledMenuItem = styled(MenuItem)`
  font-size: 1.4rem !important;
`

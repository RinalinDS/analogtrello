import * as React from 'react'
import { FC, memo, useCallback } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import styled from 'styled-components'

import { Icon, IconType } from '../Icon'

type BasicMenuPropsType = {
  iconType: IconType
  children: React.ReactNode
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  anchorEl: HTMLElement | null
}

export const BasicMenu: FC<BasicMenuPropsType> = memo(
  ({ iconType, children, setAnchorEl, anchorEl }) => {
    const open = Boolean(anchorEl)
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
      },
      [setAnchorEl],
    )

    const handleClose = useCallback(() => {
      setAnchorEl(null)
    }, [setAnchorEl])

    return (
      <>
        <StyledMenuBtn
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Icon type={iconType} />
        </StyledMenuBtn>
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {children}
        </StyledMenu>
      </>
    )
  },
)

const StyledMenuBtn = styled(Button)`
  cursor: pointer;

  div &:hover {
    background: rgba(253, 242, 233, 0.5);
    border-radius: 11px;
  }

  & > svg {
    font-size: 2.4rem;
  }
`
const StyledMenu = styled(Menu)`
  z-index: 5;
`

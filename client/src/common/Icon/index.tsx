import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import { FC } from 'react'

export type IconType = 'more' | 'plus'

export const Icon: FC<{ type: IconType }> = ({ type }) => {
  switch (type) {
    case 'plus':
      return <StyledAddIcon fontSize={'large'} color={'action'} />
    case 'more':
      return <StyledMoreIcon fontSize={'large'} color={'action'} />
    default:
      return null
  }
}

const StyledMoreIcon = styled(MoreHorizIcon)``
const StyledAddIcon = styled(AddIcon)``

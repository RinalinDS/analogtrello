import styled from 'styled-components'

import { LinearProgress } from '@mui/material'

import { Text } from '../../common/shared/style'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectIsLoading } from '../../store/selectors/appSelector'

export const Header = () => {
  const isDataLoading = useAppSelector(selectIsLoading)

  return (
    <HeaderContainer>
      {isDataLoading && <LinearProgress color={'secondary'} />}
      <TextContainer>
        <Text>Rinalin's Trello Analog</Text>
      </TextContainer>
    </HeaderContainer>
  )
}

export const HeaderContainer = styled.header`
  grid-column-start: span 2;
  color: white;
  border-bottom: 1px solid white;
  background: ${props => props.theme.background || '#343a40'};
`
const TextContainer = styled.div`
  padding: 1rem;
`

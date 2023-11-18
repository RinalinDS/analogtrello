import { FC } from 'react'

import styled from 'styled-components'

import { LinearProgress } from '@mui/material'

import { useAppSelector } from '../../hooks/useAppSelector'
import { selectIsLoading } from '../../store/selectors/appSelector'

export const Header: FC = () => {
  const isDataLoading = useAppSelector(selectIsLoading)

  return (
    <HeaderContainer>
      {isDataLoading && <LinearProgress color={'secondary'} />}
      <TextContainer>
        <Title>Rinalin's Trello Analog</Title>
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
const Title = styled.h1`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 36px;
`

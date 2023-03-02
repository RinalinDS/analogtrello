import React, { memo } from 'react'
import styled from 'styled-components'

export const Header = memo(() => {
  return <HeaderContainer>hello</HeaderContainer>
})
export const HeaderContainer = styled.header`
  grid-column-start: span 2;
  background: #343a40;
  color: white;
  border-bottom: 1px solid white;
`

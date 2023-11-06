import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Preloader = () => {
  return (
    <Container>
      <Circle />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  animation: ${spin} 1s linear infinite;
`

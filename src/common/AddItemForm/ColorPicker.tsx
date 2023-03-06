import React, { FC } from 'react'
import styled from 'styled-components'

type PropsType = {
  colors: { hex: string; color: string }[]
  activeColor: number
  setActiveColor: (value: number) => void
}

export const ColorPicker: FC<PropsType> = ({ colors, setActiveColor, activeColor }) => {
  return (
    <Grid>
      <Title>Background:</Title>
      {colors.map((m, i) => (
        <Item
          key={i}
          bgColor={m.hex}
          active={i === activeColor}
          onClick={() => setActiveColor(i)}
        />
      ))}
    </Grid>
  )
}

export const Grid = styled.div`
  margin-top: 2rem;
  padding: 0.6rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  justify-items: center;
`
export const Item = styled.div<{ bgColor: string; active: boolean }>`
  background: ${props => props.bgColor};
  text-transform: capitalize;
  width: 3.6rem;
  height: 3.6rem;
  border: ${props => (props.active ? '3px solid lightcoral' : '')};
`
export const Title = styled.h4`
  grid-column: 1/-1;
  justify-self: start;
  font-size: 1.2rem;
  font-weight: 700;
  color: #5e6c84;
  margin-bottom: -1rem;
`

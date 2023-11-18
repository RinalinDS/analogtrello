import { FC, memo } from 'react'
import styled from 'styled-components'

import { ColorItem } from './ColorItem'

type Props = {
  colors: { hex: string; color: string }[]
  activeColor: number
  setActiveColor: (value: number) => void
}

export const ColorPicker: FC<Props> = memo(({ colors, setActiveColor, activeColor }) => {
  return (
    <Grid>
      <Title>Background:</Title>
      {colors.map((m, i) => (
        <ColorItem
          key={i}
          bgColor={m.hex}
          active={i === activeColor}
          onClick={setActiveColor}
          index={i}
        />
      ))}
    </Grid>
  )
})

export const Grid = styled.div`
  margin-top: 2rem;
  padding: 0.6rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  justify-items: center;
`

export const Title = styled.h4`
  grid-column: 1/-1;
  justify-self: start;
  font-size: 1.2rem;
  font-weight: 700;
  color: #5e6c84;
  margin-bottom: -1rem;
`

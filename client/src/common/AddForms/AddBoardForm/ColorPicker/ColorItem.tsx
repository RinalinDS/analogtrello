import { FC, memo, useCallback } from 'react'
import styled from 'styled-components'

type ColorItemPropsType = {
  bgColor: string
  active: boolean
  onClick: (value: number) => void
  index: number
}

export const ColorItem: FC<ColorItemPropsType> = memo(({ onClick, active, index, bgColor }) => {
  const onClickHandler = useCallback(() => onClick(index), [index, onClick])
  return <Item bgColor={bgColor} active={active} onClick={onClickHandler}></Item>
})

export const Item = styled.div<{ bgColor: string; active: boolean }>`
  background: ${props => props.bgColor};
  text-transform: capitalize;
  width: 3.6rem;
  height: 3.6rem;
  border: ${props => (props.active ? '3px solid lightcoral' : '')};
`

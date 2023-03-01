import React, { FC, memo, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

type PortalModalPropsType = {
  visible: boolean
  setIsModalVisible: (value: boolean) => void
  children: React.ReactNode
}

export const Modal: FC<PortalModalPropsType> = memo(({ visible, children, setIsModalVisible }) => {
  const onClickHandler = useCallback(() => {
    setIsModalVisible(false)
  }, [setIsModalVisible])
  const root = document.querySelector('body')
  useEffect(() => {
    const onEscPressHandler = function (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsModalVisible(false)
      }
    }
    window.addEventListener('keydown', onEscPressHandler)
    return () => {
      window.removeEventListener('keydown', onEscPressHandler)
    }
  }, [setIsModalVisible])

  if (root && visible) {
    return createPortal(
      <>
        <ModalOverlay onClick={onClickHandler} />
        <ModalContainer>
          <ModalCloseButton onClick={onClickHandler}>&times;</ModalCloseButton>
          {children}
        </ModalContainer>
      </>,
      root,
    )
  }
  return null
})

export const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`
export const ModalContainer = styled.div`
  background: #ffffff;
  color: #333333;
  padding: 2rem;
  position: fixed;
  bottom: 3rem;
  left: 26rem;
  z-index: 9999;
  height: 38rem;
  width: 22rem;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: -6px;
  right: 6px;
  font-size: 3rem;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
`

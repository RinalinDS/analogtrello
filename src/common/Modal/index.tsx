import React, { FC, memo, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

type PortalModalPropsType = {
  visible: boolean
  setIsVisible: (value: boolean) => void
  children: React.ReactNode
}

export const Modal: FC<PortalModalPropsType> = memo(({ visible, children, setIsVisible }) => {
  const closeModal = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  const root = document.querySelector('body')

  const onEscPressCloseModalHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal],
  )

  useEffect(() => {
    window.addEventListener('keydown', onEscPressCloseModalHandler)
    return () => {
      window.removeEventListener('keydown', onEscPressCloseModalHandler)
    }
  }, [setIsVisible, onEscPressCloseModalHandler])

  if (root && visible) {
    return createPortal(
      <>
        <ModalOverlay onClick={closeModal} />
        <ModalContainer>
          <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  z-index: 1001;
  color: #333333;
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

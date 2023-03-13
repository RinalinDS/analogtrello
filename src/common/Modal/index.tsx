import React, { FC, memo, MouseEvent, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

type PortalModalPropsType = {
  visible: boolean
  setIsModalVisible: (value: boolean) => void
  children: React.ReactNode
}

export const Modal: FC<PortalModalPropsType> = memo(({ visible, children, setIsModalVisible }) => {
  const onClickHandler = useCallback(() => {
    console.log('ONCLICKHANDLER')
    setIsModalVisible(false)
  }, [setIsModalVisible])

  console.log(visible)

  const root = document.querySelector('body')

  const onEscPressHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalVisible(false)
      }
    },
    [setIsModalVisible],
  )

  const stopPropagationHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onEscPressHandler)
    return () => {
      window.removeEventListener('keydown', onEscPressHandler)
    }
  }, [setIsModalVisible, onEscPressHandler])

  if (root && visible) {
    return createPortal(
      <>
        <ModalOverlay onClick={onClickHandler} />
        <ModalContainer onClick={stopPropagationHandler}>
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 4rem;
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

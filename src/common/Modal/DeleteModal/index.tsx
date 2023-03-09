import React, { FC, memo, SyntheticEvent, useCallback, useEffect } from 'react'
import styled from 'styled-components'

type DeleteModalPropsType = {
  visible: boolean
  setIsModalVisible: (value: boolean) => void
  children: React.ReactNode
}

export const DeleteModal: FC<DeleteModalPropsType> = memo(
  ({ visible, children, setIsModalVisible }) => {
    const onClickHandler = useCallback(() => {
      setIsModalVisible(false)
    }, [setIsModalVisible])

    const onEscPressHandler = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsModalVisible(false)
        }
      },
      [setIsModalVisible],
    )

    const stopPropagationHandler = useCallback((e: SyntheticEvent) => {
      e.stopPropagation()
    }, [])

    useEffect(() => {
      window.addEventListener('keydown', onEscPressHandler)
      return () => {
        window.removeEventListener('keydown', onEscPressHandler)
      }
    }, [setIsModalVisible, onEscPressHandler])

    if (!visible) return null

    return (
      <>
        <ModalOverlay onClick={onClickHandler} />
        <ModalContainer onClick={stopPropagationHandler}>{children}</ModalContainer>
      </>
    )
  },
)

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
  position: absolute;
  top: 100%;
  right: -75%;
  z-index: 9999;
`

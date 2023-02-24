import React, { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

type PortalModalPropsType = {
  visible: boolean
  setIsModalVisible: (value: boolean) => void
  children: React.ReactNode
}

export const Modal: FC<PortalModalPropsType> = ({ visible, children, setIsModalVisible }) => {
  const onClickHandler = () => {
    setIsModalVisible(false)
  }
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
  }, [])

  if (root && visible) {
    return createPortal(
      <>
        <div className={styles.overlay} onClick={onClickHandler} />
        <div className={styles.modal}>
          <button className={styles.closeModal} onClick={onClickHandler}>
            &times;
          </button>
          {children}
        </div>
      </>,
      root,
    )
  }
  return null
}

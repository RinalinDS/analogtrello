import { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react'

import { StyledEditableText, StyledTextarea } from '../shared/style'

type PropsType = {
  text: string
  changeText: (title: string) => void
}

export const EditableTextWithTextArea: FC<PropsType> = memo(({ text, changeText }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [newText, setNewText] = useState<string>(text)

  const changeTextHandler = useCallback(() => {
    if (newText !== text) {
      const trimmedNewTitle = newText.trim()
      trimmedNewTitle && changeText(trimmedNewTitle)
    }
    if (!newText.trim()) {
      setNewText(text)
    }
  }, [newText, changeText, text])

  const openEdit = useCallback(() => setIsEdit(true), [])
  const closeEdit = useCallback(() => setIsEdit(false), [])

  const onTextAreaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.currentTarget.value)
  }, [])

  const onBlurHandler = useCallback(() => {
    closeEdit()
    changeTextHandler()
  }, [changeTextHandler, closeEdit])

  const escapeAndEnterHandler = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Escape') {
        closeEdit()
        setNewText(text)
      }
      if (e.key === 'Enter') {
        closeEdit()
        changeTextHandler()
      }
    },
    [changeTextHandler, closeEdit, text],
  )
  return isEdit ? (
    <StyledTextarea
      value={newText}
      onChange={onTextAreaChange}
      spellCheck={false}
      onBlur={onBlurHandler}
      autoFocus
      onKeyDown={escapeAndEnterHandler}
    />
  ) : (
    <StyledEditableText onClick={openEdit}>{text}</StyledEditableText>
  )
})

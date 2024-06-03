'use client'
import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'pixa-simple-ckeditor5'
import './style.css'

type Props = {
  onChange?: (value: string, position: number) => void
  value?: string
  theme?: any
  cursorPosition?: any
}

const WhatsappEditor: React.FC<Props> = ({ onChange, value }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData()
        const position =
          editor.editing.view.document.selection._ranges[0].start.offset
        if (onChange) {
          onChange(data, position)
        }
      }}
    />
  )
}

export default WhatsappEditor

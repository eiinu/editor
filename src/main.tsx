import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import Editor from '@eiinu/editor-core'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Editor />
  </StrictMode>,
)

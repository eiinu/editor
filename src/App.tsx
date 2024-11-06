import { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { Button, Toolbar } from './components'
import './App.less'
import { CSSProperties } from 'react'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
} as {
  [key: string]: string
}

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'todo']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const defaultValue: any[] = [
  { type: "paragraph", align: "left", children: [{ text: "1. Inline" }] },
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "bold", bold: true },
      { text: " " },
      { text: "italic", italic: true },
      { text: " " },
      { text: "underline", underline: true },
      { text: " " },
      { text: "code", code: true },
      { text: " " },
      { text: "line-through", lineThrough: true },
      { text: " " },
      { text: "color", color: "pink" },
      { text: " " },
      { text: "backgroundColor", backgroundColor: "skyblue" },
      { text: " " }
    ]
  },
  { type: "paragraph", align: "left", children: [{ text: "" }] },
  { type: "paragraph", align: "left", children: [{ text: "2. Block" }] },
  { type: "h1", align: "left", children: [{ text: "header1" }] },
  { type: "h2", align: "left", children: [{ text: "header2" }] },
  { type: "h3", align: "left", children: [{ text: "header3" }] },
  { type: "h4", align: "left", children: [{ text: "header4" }] },
  { type: "h5", align: "left", children: [{ text: "header5" }] },
  { type: "h6", align: "left", children: [{ text: "header6" }] },
  { type: "block-quote", align: "left", children: [{ text: "quote" }] },
  {
    type: "numbered-list",
    children: [
      {
        type: "list-item",
        align: "left",
        children: [{ text: "numbered list 1" }]
      },
      {
        type: "list-item",
        align: "left",
        children: [{ text: "numbered list 2" }]
      }
    ]
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        align: "left",
        children: [{ text: "bulleted list 1" }]
      },
      {
        type: "list-item",
        align: "left",
        children: [{ text: "bulleted list 2" }]
      }
    ]
  },
  {
    type: "todo",
    children: [
      {
        type: "todo-item",
        checked: true,
        children: [{ text: "todo true" }]
      },
      {
        type: "todo-item",
        checked: false,
        children: [{ text: "todo false" }]
      }
    ]
  },
  { type: "paragraph", children: [{ text: "align left" }], align: "left" },
  { type: "paragraph", align: "center", children: [{ text: "align center" }] },
  { type: "paragraph", align: "right", children: [{ text: "align right" }] },
  {
    type: "paragraph",
    align: "justify",
    children: [{ text: "align justify" }]
  },
  { type: "paragraph", align: "left", children: [{ text: "" }] },
  { type: "paragraph", align: "left", children: [{ text: "" }] }
];

const RichTextExample = () => {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const value = useMemo(
    () =>{
      try {
        const content = localStorage.getItem('content')
        if (content) return JSON.parse(content)
      } catch {}
      return defaultValue
    },
    []
  )


  return (
    <Slate editor={editor} initialValue={value} onChange={(value) => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
      }
    }}>
      <Toolbar>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <MarkButton format="lineThrough" icon="line-through" />
        <StyleButton format="color" value="pink" icon="color:pink" />
        <StyleButton format="backgroundColor" value="skyblue" icon="bgColor:skyblue" />
        <BlockButton format="h1" icon="h1" />
        <BlockButton format="h2" icon="h2" />
        <BlockButton format="h3" icon="h3" />
        <BlockButton format="h4" icon="h4" />
        <BlockButton format="h5" icon="h5" />
        <BlockButton format="h6" icon="h6" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="numbered" />
        <BlockButton format="bulleted-list" icon="bulleted" />
        <BlockButton format="todo" icon="bulleted" />
        <BlockButton format="left" icon="align_left" />
        <BlockButton format="center" icon="align_center" />
        <BlockButton format="right" icon="align_right" />
        <BlockButton format="justify" icon="align_justify" />
      </Toolbar>
      <Editable
        className='editable-content'
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement> & {
    align?: string
    type?: string
  }
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any)[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as any
  return marks ? marks[format] === true : false
}

type ElementProps = {
  attributes: any,
  children: React.ReactNode,
  element: any
}

const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
    case 'todo':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'todo-item':
      return (
        <li style={style} {...attributes}>
          <input type='checkbox' defaultChecked={element.checked} onChange={(e) => {
            console.log(e)
            element.checked = e.target.checked
          }}></input>
          {children}
        </li>
      )
    case 'h1':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      )
    case 'h6':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

type LeafProps = {
  attributes: any,
  children: React.ReactNode,
  leaf: any
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  const style: CSSProperties = {}
  if (leaf.color) {
    style.color = leaf.color
  }
  if (leaf.backgroundColor) {
    style.backgroundColor = leaf.backgroundColor
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.lineThrough) {
    children = <del>{children}</del>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes} style={style}>{children}</span>
}

type ButtonProps = {
  format: string,
  value?: string,
  icon: string
}

const BlockButton = ({ format, icon }: ButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const toggleStyle = (editor: Editor, format: string, value: string) => {
  const marks = Editor.marks(editor) as any
  const isActive = marks ? marks[format] === value : false
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, value)
  }
}

const MarkButton = ({ format, icon }: ButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const StyleButton = ({ format, value, icon }: ButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault()
        toggleStyle(editor, format, value || '')
      }}
    >
      {icon}
    </Button>
  )
}

export default RichTextExample
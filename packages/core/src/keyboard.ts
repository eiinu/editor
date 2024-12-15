import isHotkey from "is-hotkey"
import { toggleMark } from "./utils"
import { Editor } from "slate"

export const HOTKEYS = {
  'mod+b': ['bold', true],
  'mod+i': ['italic', true],
  'mod+u': ['underline', true],
  'mod+`': ['code', true],
} as {
  [key: string]: [string, string | boolean]
}

export const handleKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault()
      const [mark, value] = HOTKEYS[hotkey]
      toggleMark(editor, mark, value)
    }
  }
}
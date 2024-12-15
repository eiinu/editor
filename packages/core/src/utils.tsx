import { Editor, Transforms, Element as SlateElement } from "slate";
import { LIST_TYPES } from "./config";

export const toggleMark = (
  editor: Editor,
  format: string,
  value: string | boolean
) => {
  const marks = Editor.marks(editor) as any;
  const isActive = marks ? marks[format] === value : false;
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: string,
  value: string | boolean
) => {
  const { selection } = editor;
  if (!selection) return false;

  let key;
  let val;
  if (format === "align" || format === "textIndent" || format === "indent") {
    key = format;
    val = value;
  } else {
    key = "type";
    val = format;
  }

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any)[key] === val
    })
  );

  return !!match;
};

export const toggleBlock = (
  editor: Editor,
  format: string,
  value: string | boolean
) => {
  const isActive = isBlockActive(editor, format, value);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type) &&
      format !== "align" &&
      format === "textIndent",
    split: true
  });
  let newProperties: Partial<
    SlateElement & {
      align: string | boolean;
      textIndent: string | boolean;
      indent: string;
      type: string;
    }
  >;
  if (format === "type") {
    newProperties = {
      type: isActive ? "p" : isList ? "list-item" : format
    };
  } else {
    newProperties = {
      [format]: value
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const getFormatValue = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] : false;
};

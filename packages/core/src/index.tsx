import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Toolbar } from "./components";
import { handleKeyDown } from "./keyboard";
import { defaultValue } from "./config";
import { BlockButton, MarkButton } from "./components/button";
import { Leaf } from "./components/leaf";
import { Element } from "./components/element";

const RichTextEditor = () => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const value = useMemo(() => {
    try {
      const content = localStorage.getItem("content");
      if (content) return JSON.parse(content);
    } catch {}
    return defaultValue;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <Toolbar>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <MarkButton format="lineThrough" icon="line-through" />
        <MarkButton format="color" value="pink" icon="color:pink" />
        <MarkButton
          format="backgroundColor"
          value="skyblue"
          icon="bgColor:skyblue"
        />
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
        <BlockButton format="align" value="left" icon="align_left" />
        <BlockButton format="align" value="center" icon="align_center" />
        <BlockButton format="align" value="right" icon="align_right" />
        <BlockButton format="align" value="justify" icon="align_justify" />
        <BlockButton format="textIndent" value="0" icon="textIndent-0" />
        <BlockButton format="textIndent" value="2em" icon="textIndent-2em" />
        <BlockButton format="textIndent" value="4em" icon="textIndent-4em" />
        <BlockButton format="indent" value="0" icon="indent-0" />
        <BlockButton format="indent" value="2em" icon="indent-2em" />
        <BlockButton format="indent" value="4em" icon="indent-4em" />
      </Toolbar>
      <Editable
        className="editable-content"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(e: React.KeyboardEvent) => {
          handleKeyDown(e, editor);
        }}
      />
    </Slate>
  );
};

export { RichTextEditor as default };

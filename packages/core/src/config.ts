export const LIST_TYPES = ["numbered-list", "bulleted-list", "todo"];

export const defaultValue: any[] = [
  { type: "p", align: "left", children: [{ text: "1. Inline" }] },
  {
    type: "p",
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
  { type: "p", align: "left", children: [{ text: "" }] },
  { type: "p", align: "left", children: [{ text: "2. Block" }] },
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
  { type: "p", children: [{ text: "align left" }], align: "left" },
  { type: "p", align: "center", children: [{ text: "align center" }] },
  { type: "p", align: "right", children: [{ text: "align right" }] },
  {
    type: "p",
    align: "justify",
    children: [{ text: "align justify" }]
  },
  { type: "p", children: [{ text: "text indent 2em" }], textIndent: "2em" },
  { type: "p", children: [{ text: "text indent 4em" }], textIndent: "4em" },
  { type: "p", children: [{ text: "indent 2em" }], indent: "2em" },
  { type: "p", children: [{ text: "indent 4em" }], indent: "4em" }
];
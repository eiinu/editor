export type ElementProps = {
  attributes: any;
  children: React.ReactNode;
  element: any;
};

export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = {
    textAlign: element.align,
    textIndent: element.textIndent,
    paddingLeft: element.indent
  };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
    case "todo":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "todo-item":
      return (
        <li style={style} {...attributes}>
          <input
            type="checkbox"
            defaultChecked={element.checked}
            onChange={(e) => {
              console.log(e);
              element.checked = e.target.checked;
            }}
          ></input>
          {children}
        </li>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

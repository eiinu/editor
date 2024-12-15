import { CSSProperties } from "react";

export type LeafProps = {
  attributes: any;
  children: React.ReactNode;
  leaf: any;
};

export const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  const style: CSSProperties = {};
  if (leaf.color) {
    style.color = leaf.color;
  }
  if (leaf.backgroundColor) {
    style.backgroundColor = leaf.backgroundColor;
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.lineThrough) {
    children = <del>{children}</del>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

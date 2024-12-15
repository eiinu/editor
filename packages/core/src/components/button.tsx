import { useSlate } from "slate-react";
import {
  getFormatValue,
  isBlockActive,
  toggleBlock,
  toggleMark
} from "../utils";
import { Ref } from "react";
import { css, cx } from "@emotion/css";
import React from "react";

type ButtonProps = {
  format: string;
  value?: string | boolean;
  icon: string;
};

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }: any, ref: Ref<any>) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

export const MarkButton = ({ format, icon, value = true }: ButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={getFormatValue(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format, value);
      }}
    >
      {icon}
    </Button>
  );
};

export const BlockButton = ({ format, icon, value = false }: ButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format, value)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format, value);
      }}
    >
      {icon}
    </Button>
  );
};

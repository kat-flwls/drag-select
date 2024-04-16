import React from "react";
import { FC, forwardRef } from "react";

interface ITagProps {
  onClick: () => void;
  active: boolean;
  children?: React.ReactNode;
  ref: any;
  id?: string;
}

const Tag: FC<ITagProps> = forwardRef<HTMLDivElement, ITagProps>(
  ({ onClick, active, children, id }, ref) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        id={id}
        style={{
          width: "26px",
          height: "40px",
          border: "1px solid #ebeef5",
          boxSizing: "border-box",
          borderRadius: "6px",
          fontSize: "12px",
          marginLeft: "6px",
          marginBottom: "8px",
          lineHeight: "40px",
          userSelect: "none",
          color: active ? "white" : "",
          backgroundColor: active ? "#25b856" : "#f5f7fa",
        }}
      >
        {children}
      </div>
    );
  }
);

export default Tag;

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDragSelect } from "./../DraggableButton/DragSelectContext.tsx";

const tags: number[] = [];
for (let i = 1; i <= 100; i++) {
  tags.push(i);
}

interface ITagProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  ref: any;
}

const Tag: React.FC<ITagProps> = forwardRef<HTMLDivElement, ITagProps>(
  ({ onClick, active, children }, ref) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
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

const BoxSelectList = () => {
  const [selected, setSelected] = useState([]);
  const elRefs = useRef([]);
  const targetRef = useRef(null);

  const handleClickTag = (text) => {
    const idx = selected.indexOf(text);
    if (idx > -1) {
      setSelected((prev) => {
        prev.splice(idx, 1);
        return [...prev];
      });
    } else {
      setSelected((prev) => [...prev, text]);
    }
  };

  useEffect(() => {
    new DragSelect({
      selectables: elRefs.current,
      callback: (e) => {
        if (e.length) {
          setSelected(e.map((el) => Number(el.innerText.trim())));
        }
      },
      area: targetRef.current,
      draggability: false
    });
  }, [elRefs, targetRef]);

  return (
    <div
      ref={targetRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "800px",
        margin: "0 auto",
        border: "1px, solid, #dedede",
        padding: "50px",
      }}
    >
      {tags.map((tag, idx) => (
        <Tag
          onClick={() => handleClickTag(tag)}
          active={selected.includes(tag)}
          ref={(el) => {
            elRefs.current[idx] = el;
          }}
        >
          {tag.toString().padStart(3, "0")}
        </Tag>
      ))}
    </div>
  );
};

export default BoxSelectList;
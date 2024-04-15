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

const List: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);
  const ds = useDragSelect();

  const handleClickTag = (text: number) => {
    if (!text) return;
    const idx = selected.indexOf(text);
    if (idx > -1) {
      setSelected((prev) => {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      });
    } else {
      setSelected((prev) => [...prev, text]);
    }
  };

  // adding selectable elements
  useEffect(() => {
    const elements = elRefs.current as HTMLElement[];
    if (!elements || !ds) return;
    ds.addSelectables(elements);
  }, [ds, elRefs]);

  // subscribing to a callback
  useEffect(() => {
    if (!ds) return;
    const id = ds.subscribe("DS:end", (e) => {
      console.log("e:", e);
      if (e.items.length) {
        setSelected(e.items.map((el) => Number(el.innerText.trim())));
      }
    });

    return () => ds.unsubscribe("DS:end", id!);
  }, [ds]);

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

export default List;

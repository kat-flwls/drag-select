import React, { forwardRef, useEffect, useRef, useState } from "react";

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
  const [selected, setSelected] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const startCoord = useRef({ x: 0, y: 0 });
  const endCoord = useRef({ x: 0, y: 0 });
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    startCoord.current = { x: e.clientX, y: e.clientY };
    endCoord.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      endCoord.current = { x: e.clientX, y: e.clientY };
      selectElements();
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const selectElements = () => {
    const elements = elRefs.current as HTMLElement[];
    const startX = Math.min(startCoord.current.x, endCoord.current.x);
    const endX = Math.max(startCoord.current.x, endCoord.current.x);
    const startY = Math.min(startCoord.current.y, endCoord.current.y);
    const endY = Math.max(startCoord.current.y, endCoord.current.y);

    const newSelected: number[] = [];
    elements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const isInSelection =
        rect.left <= endX &&
        rect.right >= startX &&
        rect.top <= endY &&
        rect.bottom >= startY;
      if (isInSelection) {
        newSelected.push(Number(el.innerText.trim()));
      }
    });

    setSelected(newSelected);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h4>Box select Only</h4>
      <div
        ref={targetRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "800px",
          margin: "0 auto",
          border: "1px solid #dedede",
          padding: "20px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {tags.map((tag, idx) => (
          <Tag
            key={tag}
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
    </div>
  );
};

export default BoxSelectList;

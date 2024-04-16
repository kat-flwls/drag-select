import React, { useRef, useState } from "react";
import Tag from "../Tag/Tag.tsx";

// Define tags with unique IDs and labels
const tags = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  label: (i + 1).toString().padStart(3, "0"),
}));

const BoxSelectList = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const startCoord = useRef({ x: 0, y: 0 });
  const endCoord = useRef({ x: 0, y: 0 });
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  console.log("selected:", selected);

  const handleClickTag = (id: number) => {
    const idx = selected.indexOf(id);
    if (idx > -1) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
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
        newSelected.push(Number(el.id));
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
            key={tag.id}
            onClick={() => handleClickTag(tag.id)}
            active={selected.includes(tag.id)}
            ref={(el) => {
              elRefs.current[idx] = el;
            }}
            id={tag.id}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default BoxSelectList;

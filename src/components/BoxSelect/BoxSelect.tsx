import React, { useRef, useState } from "react";
import Button from "../Button/Button.tsx";

const BoxSelectButtons = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const startCoord = useRef({ x: 0, y: 0 });
  const endCoord = useRef({ x: 0, y: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleClickButton = (text: number) => {
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

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    startCoord.current = { x: e.clientX, y: e.clientY };
    endCoord.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      endCoord.current = { x: e.clientX, y: e.clientY };
      selectButton();
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const selectButton = () => {
    const buttons = buttonRefs.current as HTMLButtonElement[];
    const startX = Math.min(startCoord.current.x, endCoord.current.x);
    const endX = Math.max(startCoord.current.x, endCoord.current.x);
    const startY = Math.min(startCoord.current.y, endCoord.current.y);
    const endY = Math.max(startCoord.current.y, endCoord.current.y);

    const newSelected: number[] = [];
    buttons.forEach((btn, idx) => {
      const rect = btn.getBoundingClientRect();
      const isInSelection =
        rect.left <= endX &&
        rect.right >= startX &&
        rect.top <= endY &&
        rect.bottom >= startY;
      if (isInSelection) {
        newSelected.push(Number(btn.innerText.trim()));
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
        <Button
          onClick={() => handleClickButton(1)}
          active={selected.includes(1)}
          ref={(btn) => {
            buttonRefs.current[0] = btn;
          }}
        >
          Button 1
        </Button>
        <Button
          onClick={() => handleClickButton(2)}
          active={selected.includes(2)}
          ref={(btn) => {
            buttonRefs.current[1] = btn;
          }}
        >
          Button 2
        </Button>
      </div>
    </div>
  );
};

export default BoxSelectButtons;

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDragSelect } from "./../DraggableButton/DragSelectContext.tsx";

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const List: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);
  const ds = useDragSelect();

  useEffect(() => {
    const buttons = buttonRefs.current as HTMLButtonElement[];
    if (!buttons || !ds) return;
    ds.addSelectables(buttons);
  }, [ds, buttonRefs]);

  useEffect(() => {
    if (!ds) return;
    const id = ds.subscribe("DS:end", (e) => {
      if (e.items.length) {
        setSelected(e.items.map((el) => el.id));
      }
    });

    return () => ds.unsubscribe("DS:end", id!);
  }, [ds]);

  const handleClickButton = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h4>Box select and Draggable</h4>
      <div
        ref={targetRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "800px",
          margin: "0 auto",
          border: "1px solid #dedede",
        }}
      >
        {[...Array(5)].map((_, idx) => (
          <button
            key={idx}
            id={generateUniqueId()}
            onClick={() => handleClickButton(buttonRefs.current[idx]?.id ?? "")}
            style={{
              width: "100px",
              height: "40px",
              border: "1px solid #ebeef5",
              boxSizing: "border-box",
              borderRadius: "6px",
              fontSize: "12px",
              marginLeft: "6px",
              marginBottom: "8px",
              lineHeight: "40px",
              userSelect: "none",
              color: selected.includes(buttonRefs.current[idx]?.id ?? "")
                ? "white"
                : "",
              backgroundColor: selected.includes(
                buttonRefs.current[idx]?.id ?? ""
              )
                ? "#25b856"
                : "#f5f7fa",
            }}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
          >
            {`Button ${idx + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;

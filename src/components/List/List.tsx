import React, { useEffect, useRef, useState } from "react";
import DragSelect from "dragselect";

const tags: number[] = [];
for (let i = 1; i <= 100; i++) {
  tags.push(i);
}

interface ITagProps {
  key: number;
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

const Tag: React.FC<ITagProps> = ({ onClick, active, children }) => {
  const ref = useRef<HTMLDivElement>(null);
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
};

const List: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  console.log("selected:", selected);

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

  interface DragSelectSettings {
    selectables: HTMLElement[];
    callback?: (selectedElements: HTMLElement[]) => void;
    area?: HTMLElement | undefined;
    draggability?: boolean;
  }

  useEffect(() => {
    new DragSelect({
      selectables: elRefs.current as HTMLElement[],
      callback: (e: HTMLElement[]) => {
        if (e.length) {
          setSelected(e.map((el) => Number(el.innerText.trim())));
        }
      },
      area: targetRef.current,
      draggability: false,
    } as DragSelectSettings);
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
          key={tag}
          onClick={() => handleClickTag(tag)}
          active={selected.includes(tag)}
        >
          {tag.toString().padStart(3, "0")}
        </Tag>
      ))}
    </div>
  );
};

export default List;

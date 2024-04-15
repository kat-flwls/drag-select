import React, { useEffect, useRef, useState } from "react";
import { useDragSelect } from "./DragSelectContext.tsx";

const DraggableButton = () => {
  const [selected, setSelected] = useState<any>();
  const ds = useDragSelect();
  const inputEl = useRef(null);

  const handleClickAway = () => {
    setSelected(null);
  };

  // adding a selectable element
  useEffect(() => {
    const element = inputEl.current as unknown as HTMLElement;
    if (!element || !ds) return;
    ds.addSelectables(element);
  }, [ds, inputEl]);

  // subscribing to a callback
  useEffect(() => {
    if (!ds) return;
    const id = ds.subscribe("DS:end", (e) => {
      setSelected(e);
    });

    return () => ds.unsubscribe("DS:end", id!);
  }, [ds]);

  return (
    <button ref={inputEl} aria-labelledby="Selectable" onBlur={handleClickAway}>
      Selectable
    </button>
  );
};

export default DraggableButton;

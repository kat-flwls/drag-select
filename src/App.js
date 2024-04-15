import React from "react";
import { DragSelectProvider } from "./components/DraggableButton/DragSelectContext.tsx";
import DraggableButton from "./components/DraggableButton/DraggableButton.tsx"; 
import BoxSelectList from "./components/BoxSelectList/BoxSelectList.tsx";
import List from "./components/List/List.tsx";

const App = () => (
  <DragSelectProvider >
    <div style={{ padding: "20px"}}>
    <DraggableButton/>
    </div>
    <List/>
    <div style={{ padding: "20px"}}>
    <BoxSelectList/>
    </div>
  </DragSelectProvider>
);

export default App;

import React from "react";
import { DragSelectProvider } from "./components/DraggableButton/DragSelectContext.tsx";
import DraggableButton from "./components/DraggableButton/DraggableButton.tsx"; 
import List from "./components/List/List.tsx";

const App = () => (
  <DragSelectProvider >
    <div style={{ padding: "20px"}}>
    <DraggableButton/>
    </div>
    <List/>
  </DragSelectProvider>
);

export default App;

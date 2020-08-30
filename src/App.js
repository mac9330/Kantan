import React from 'react';
// import logo from './mintbean.png';
import './styles/index.css';
import Kanban from "./components/kanban"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Kanban></Kanban>
    </DndProvider>
  );
}

export default App;

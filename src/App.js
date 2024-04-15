import './App.css';
import List from './components/List/List.tsx';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", textAlign: "center",}}>
      <h3>
      Drag Select
      </h3>
      <List/>
    </div>
  );
}

export default App;

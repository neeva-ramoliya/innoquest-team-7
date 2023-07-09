import "./App.css";
import Scorecard from "./components/scorecard";
import { commentaryData } from "./data/data";

function App() {
  return (
    <div className="App">
      <Scorecard data={commentaryData[0]} />
    </div>
  );
}

export default App;

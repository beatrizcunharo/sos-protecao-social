import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import './styles/comon.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </div>
  );
}

export default App;

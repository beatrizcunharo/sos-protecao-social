import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import './App.css'
import { logout } from "./utils";

function App() {

  window.logout = logout;

  return (
    <div>
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </div>
  );
}

export default App;

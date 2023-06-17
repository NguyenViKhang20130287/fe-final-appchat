// import "./App.css";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import ChatRoom from "./pages/ChatRoom.js";
import Signout from "./pages/signout.js";
import { Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Home />
      {/* <Route path="/" exact Component={Home}></Route>
      <Route path="/" exact Component={Login}></Route> */}
    </div>
  );
}

export default App;

// import "./App.css";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import ChatRoom from "./pages/ChatRoom.js";
import Signout from "./pages/signout.js";

function App() {
  // return <Login />;
  // return <Register />;
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <ChatRoom /> */}
      <Signout />
    </div>
  );
}

export default App;

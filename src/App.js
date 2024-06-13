import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/Register";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/userprofile" element={<UserProfile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

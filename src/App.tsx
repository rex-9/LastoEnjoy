import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";

const App = () => {
  const [, setUser] = useState<string | null>();
  useEffect(() => {
    const user = localStorage.getItem("user") ?? null;
    setUser(user);
    const path = window.location.pathname;

    // Check if user is authenticated and redirect accordingly
    if (path === "/login" && user) {
      window.location.href = "/";
    } else if (path === "/" && !user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Router>
      <div className="bg-gray-800 text-white font-mooli flex flex-col justify-center items-center w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

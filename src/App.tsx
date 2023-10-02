import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<string | null>();
  useEffect(() => {
    const user = localStorage.getItem("user") ?? null;
    setUser(user);
  }, []);

  return (
    <Router>
      <div className="bg-gradient-to-br from-black via-red-300 to-blue-900 text-white font-mooli flex flex-col justify-center items-center w-screen h-screen">
        <Routes>
          <Route
            path="/"
            element={
              user === undefined ? <Navigate to="/login" replace /> : <Home />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

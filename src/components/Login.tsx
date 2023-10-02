import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify({ username, password }));

    navigate("/");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 text-black"
    >
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleInputChange}
        placeholder="Username"
        className="rounded-lg px-4 py-2"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Password"
        className="rounded-lg px-4 py-2"
      />
      <button className="btn text-white" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;

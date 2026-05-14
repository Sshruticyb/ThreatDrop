import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/login`,

        {
          email,
          password
        }

      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-3xl border border-cyan-500 w-[400px]">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-4">

          ThreatDrop

        </h1>

        <p className="text-zinc-400 text-center mb-8">

          Login

        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 p-4 rounded-xl bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-8 p-4 rounded-xl bg-zinc-800 text-white"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl"
        >

          Login

        </button>

        <p className="text-center text-zinc-400 mt-6">

          No account?{" "}

          <Link
            to="/register"
            className="text-cyan-400"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

}

export default LoginPage;
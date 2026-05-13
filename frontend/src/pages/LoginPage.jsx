import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();




  const handleLogin = async () => {

    try {

      const response = await axios.post(

        "import.meta.env.VITE_API_URL/login",

        {

          email,
          password

        }

      );



      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token

      );



      localStorage.setItem(

        "username",

        response.data.username

      );



      alert("Login successful");



      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };




  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-10 w-[450px] shadow-2xl">

        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-3">

          ThreatDrop

        </h1>

        <p className="text-zinc-400 text-center mb-8">

          Secure Login

        </p>



        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full bg-zinc-800 border border-cyan-500 rounded-xl p-4 outline-none mb-5"
        />



        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full bg-zinc-800 border border-cyan-500 rounded-xl p-4 outline-none mb-6"
        />



        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition"
        >

          Login

        </button>
        <p className="text-zinc-400 text-center mt-6">

  Don't have an account?

  {" "}

  <Link
    to="/register"
    className="text-cyan-400 hover:underline"
  >

    Register

  </Link>

</p>

      </div>

    </div>

  );

}

export default LoginPage;
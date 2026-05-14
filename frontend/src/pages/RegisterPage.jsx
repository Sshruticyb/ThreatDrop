import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";



function RegisterPage() {

  const navigate = useNavigate();



  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");




  const handleRegister = async () => {

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/register`,

        {

          username,
          email,
          password

        }

      );



      alert("Registration successful");



      navigate("/login");

    } catch (error) {

      console.log(error);



      alert("Registration failed");

    }

  };




  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-cyan-500 rounded-3xl p-10 shadow-2xl">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-4">

          ThreatDrop

        </h1>



        <p className="text-zinc-400 text-center mb-10 text-lg">

          Create Account

        </p>



        {/* USERNAME */}

        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>

            setUsername(e.target.value)

          }

          className="w-full bg-zinc-800 border border-cyan-500 rounded-2xl px-5 py-4 text-white mb-5 outline-none"

        />



        {/* EMAIL */}

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>

            setEmail(e.target.value)

          }

          className="w-full bg-zinc-800 border border-cyan-500 rounded-2xl px-5 py-4 text-white mb-5 outline-none"

        />



        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)

          }

          className="w-full bg-zinc-800 border border-cyan-500 rounded-2xl px-5 py-4 text-white mb-8 outline-none"

        />



        {/* REGISTER BUTTON */}

        <button

          type="button"

          onClick={handleRegister}

          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition"

        >

          Register

        </button>



        {/* LOGIN LINK */}

        <p className="text-zinc-400 text-center mt-8">

          Already have an account?
          {" "}



          <Link

            to="/login"

            className="text-cyan-400 hover:text-cyan-300"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}



export default RegisterPage;
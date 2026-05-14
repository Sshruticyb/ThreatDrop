import {

  Link,
  useNavigate

} from "react-router-dom";



function Sidebar() {

  const navigate =
    useNavigate();




  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");



    navigate("${import.meta.env.VITE_API_URL}/login");

  };




  return (

    <div className="w-[250px] bg-zinc-950 border-r border-cyan-500 min-h-screen p-6 flex flex-col justify-between">

      {/* TOP SECTION */}

      <div>

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">

          ThreatDrop

        </h1>



        <div className="flex flex-col gap-5">

          <Link

            to="/dashboard"

            className="text-zinc-300 hover:text-cyan-400 transition"

          >

            Dashboard

          </Link>



          <Link

            to="/upload"

            className="text-zinc-300 hover:text-cyan-400 transition"

          >

            Secure Upload

          </Link>



          <Link

            to="/phishing"

            className="text-zinc-300 hover:text-cyan-400 transition"

          >

            Phishing Scanner

          </Link>



          <Link

            to="/history"

            className="text-zinc-300 hover:text-cyan-400 transition"

          >

            My Files

          </Link>

        </div>

      </div>



      {/* LOGOUT BUTTON */}

      <button

        onClick={handleLogout}

        className="mt-10 bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-5 rounded-xl transition"

      >

        Logout

      </button>

    </div>

  );

}

export default Sidebar;
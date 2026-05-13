import {

  useEffect,
  useState

} from "react";

import {

  useParams,
  useNavigate

} from "react-router-dom";

import axios from "axios";



function WarningPage() {

  const { uuid } =
    useParams();



  const navigate =
    useNavigate();



  const [file, setFile] =
    useState(null);




  useEffect(() => {

    fetchFile();

  }, []);




  const fetchFile = async () => {

    try {

      const response =
        await axios.get(

          `http://localhost:5000/file-info/${uuid}`

        );



      setFile(response.data);

    } catch (error) {

      console.log(error);

    }

  };




  if (!file) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        Loading...

      </div>

    );

  }




  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-8">

      <div className="bg-zinc-900 border border-red-500 rounded-3xl p-10 max-w-2xl w-full text-white">

        <h1 className="text-5xl font-bold text-red-400 mb-6">

          Security Warning

        </h1>



        <p className="text-zinc-300 text-lg mb-6">

          You are about to download:

        </p>



        <div className="bg-zinc-800 rounded-xl p-5 mb-6">

          <p className="font-bold text-xl">

            {file.filename}

          </p>

        </div>



        {

          file.quarantined && (

            <div className="bg-red-950 border border-red-500 rounded-xl p-5 mb-6">

              <p className="text-red-300">

                This file has been quarantined
                because it appears dangerous.

              </p>

            </div>

          )

        }



        <div className="flex gap-4">

          {

            !file.quarantined && (

              <a

                href={`http://localhost:5000/file/${uuid}`}

                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition flex-1 text-center"

              >

                Continue Download

              </a>

            )

          }



          <button

            onClick={() => navigate(-1)}

            className="bg-zinc-700 hover:bg-zinc-600 py-3 px-6 rounded-xl flex-1"

          >

            Cancel

          </button>

        </div>

      </div>

    </div>

  );

}

export default WarningPage;
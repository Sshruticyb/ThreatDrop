import {

  useEffect,
  useState

} from "react";

import axios from "axios";



function HistoryPage() {

  const [files, setFiles] =
    useState([]);




  useEffect(() => {

    fetchFiles();

  }, []);




  const fetchFiles = async () => {

    try {

     const token =
  localStorage.getItem("token");

const response =
  await axios.get(

    "import.meta.env.VITE_API_URL/my-files",

    {

      headers: {

        authorization: token

      }

    }

  );


      setFiles(response.data);

    } catch (error) {

      console.log(error);

    }

  };


const deleteFile = async (id) => {

  try {

    const token =
      localStorage.getItem("token");



    await axios.delete(

      `import.meta.env.VITE_API_URL/delete-file/${id}`,

      {

        headers: {

          authorization: token

        }

      }

    );



    // REFRESH FILE LIST

    fetchFiles();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="text-white">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">

        My Files

      </h1>



      <div className="space-y-4">

        {

          files.map((file) => (

            <div

              key={file._id}

              className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6"

            >
<div className="flex justify-between items-center">

  {/* LEFT SIDE */}

  <div>

    <h2 className="text-xl font-bold">

      {file.filename}

    </h2>



    <p className="text-zinc-400 mt-2">

      Downloads:
      {" "}
      {file.downloadCount}

    </p>



    <p className="text-zinc-400">

      Uploaded:
      {" "}

      {

        new Date(

          file.createdAt

        ).toLocaleString()

      }

    </p>

  </div>



  {/* RIGHT SIDE */}

  <div className="flex gap-4 items-center">

    {

      file.quarantined ? (

        <span className="text-red-400 font-bold">

          QUARANTINED

        </span>

      ) : (

        <span className="text-green-400 font-bold">

          SAFE

        </span>

      )

    }



    <button

      onClick={() =>

        deleteFile(file._id)

      }

      className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl transition"

    >

      Delete

    </button>

  </div>

</div>


              {/* HASHES */}

              <div className="mt-5 text-sm break-all">

                <p>

                  <span className="text-cyan-400">

                    SHA256:
                  </span>

                  {" "}

                  {file.sha256}

                </p>



                <p className="mt-2">

                  <span className="text-yellow-400">

                    MD5:
                  </span>

                  {" "}

                  {file.md5}

                </p>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default HistoryPage;
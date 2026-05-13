import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadPage() {

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async () => {

  if (!file) {

    alert("Please select a file");

    return;

  }



  try {

    const formData = new FormData();

    formData.append("file", file);



    const token =
      localStorage.getItem("token");



    const response = await axios.post(

      "import.meta.env.VITE_API_URL/upload",

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data",

          authorization: token

        }

      }

    );



    console.log(response.data);



    navigate(

      "/success",

      {

        state: response.data

      }

    );

  } catch (error) {

    console.log(error);



    alert(

      error.response?.data?.error ||

      "Upload failed"

    );

  }

};
return (

  <div className="flex items-center justify-center min-h-screen">

    <div className="bg-zinc-900 border border-cyan-500 rounded-2xl shadow-2xl p-10 w-[450px] text-center">

      <h1 className="text-5xl font-bold text-cyan-400 mb-3">

        Secure Upload

      </h1>

      <p className="text-zinc-400 mb-8">

        AI-Powered Secure File Sharing

      </p>

      <label className="border-2 border-dashed border-cyan-500 rounded-xl p-10 cursor-pointer block hover:bg-zinc-800 transition">

        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <p className="text-lg">

          Drag & Drop or Click to Upload

        </p>

      </label>

      <br />

      {file && (

        <div className="bg-zinc-800 rounded-lg p-4 mb-6">

          <h3 className="text-cyan-400 font-semibold">

            {file.name}

          </h3>

        </div>

      )}

      <button
        onClick={handleUpload}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition w-full"
      >

        Upload Securely

      </button>

    </div>

  </div>

);
}

export default UploadPage;
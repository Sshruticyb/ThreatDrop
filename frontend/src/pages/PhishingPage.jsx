import { useState } from "react";

import axios from "axios";

function PhishingPage() {

  const [url, setUrl] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);



  const analyzeURL = async () => {

    if (!url) {

      alert("Enter a URL");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(

        "import.meta.env.VITE_API_URL/analyze-url",

        { url }

      );

      setResult(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="bg-zinc-900 border border-cyan-500 rounded-2xl shadow-2xl p-10 w-[650px]">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-3">

          ThreatDrop

        </h1>

        <p className="text-zinc-400 text-center mb-8">

          Phishing URL Detection Engine

        </p>



        {/* INPUT */}

        <input
          type="text"
          placeholder="Enter suspicious URL..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="w-full bg-zinc-800 border border-cyan-500 rounded-xl p-4 outline-none mb-5"
        />



        {/* BUTTON */}

        <button
          onClick={analyzeURL}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition"
        >

          Analyze URL

        </button>



        {/* LOADING */}

        {

          loading && (

            <p className="text-center mt-6 text-cyan-400">

              Scanning URL...

            </p>

          )

        }



        {/* RESULTS */}

        {

          result && (

            <div className="mt-8 bg-zinc-800 rounded-xl p-6">

              <h2 className="text-3xl font-bold text-red-400 mb-4">

                Threat Analysis

              </h2>



              <p className="mb-2">

                <span className="font-bold">
                  Threat Score:
                </span>

                {" "}

                {result.score}/100

              </p>



              <p className="mb-4">

                <span className="font-bold">
                  Risk Level:
                </span>

                {" "}

                <span
                  className={
                    result.riskLevel === "HIGH"
                      ? "text-red-400"
                      : result.riskLevel === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >

                  {result.riskLevel}

                </span>

              </p>



              <div>

                <h3 className="font-semibold mb-2">

                  Detection Reasons

                </h3>

                {

                  result.reasons.length === 0

                  ? (

                    <p className="text-green-400">

                      ✔ No phishing indicators detected

                    </p>

                  )

                  : (

                    result.reasons.map(

                      (reason, index) => (

                        <p
                          key={index}
                          className="text-red-300 mb-1"
                        >

                          ⚠ {reason}

                        </p>

                      )

                    )

                  )

                }

              </div>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default PhishingPage;
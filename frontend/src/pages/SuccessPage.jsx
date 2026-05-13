import {

  useLocation,
  Link

} from "react-router-dom";



function SuccessPage() {

  const location =
    useLocation();



  const data =
    location.state;




  // =========================
  // SAFETY CHECK
  // =========================

  if (!data || !data.file) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <h1 className="text-3xl">

          No Upload Data Found

        </h1>

      </div>

    );

  }




  // =========================
  // ANALYSIS FALLBACK
  // =========================

  const analysis =
    data.analysis || {

      score: 0,

      reasons: []

    };




  // =========================
  // COPY SHARE LINK
  // =========================

  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(

        `http://localhost:5173/warning/${data.file.uuid}`

      );



      alert("Link copied!");

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-8">

      <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-10 max-w-4xl w-full text-white shadow-2xl">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <h1 className="text-5xl font-bold text-cyan-400 mb-3 text-center">

          ThreatDrop

        </h1>



        <p className="text-zinc-400 text-center mb-10">

          Threat Analysis Complete

        </p>



        {/* ========================= */}
        {/* FILE INFO */}
        {/* ========================= */}

        <div className="bg-zinc-800 rounded-2xl p-6 mb-8">

          <h2 className="text-cyan-400 text-2xl font-bold mb-3">

            Uploaded File

          </h2>



          <p className="text-xl break-all">

            {data.file.filename}

          </p>

        </div>



        {/* ========================= */}
        {/* THREAT ANALYSIS */}
        {/* ========================= */}

        <div className="bg-red-950 border border-red-500 rounded-2xl p-6 mb-8">

          <h2 className="text-red-400 text-3xl font-bold mb-6">

            Threat Analysis

          </h2>



          <div className="space-y-4">

            <p className="text-lg">

              <span className="font-bold">

                Threat Score:

              </span>

              {" "}

              {analysis.score}/100

            </p>



            <p className="text-lg">

              <span className="font-bold">

                Risk Level:

              </span>

              {" "}

              <span

                className={

                  analysis.score >= 70

                    ? "text-red-400"

                    : analysis.score >= 40

                    ? "text-yellow-400"

                    : "text-green-400"

                }

              >

                {

                  analysis.score >= 70

                    ? "HIGH"

                    : analysis.score >= 40

                    ? "MEDIUM"

                    : "LOW"

                }

              </span>

            </p>



            <div>

              <h3 className="font-bold text-xl mb-3">

                Detection Reasons

              </h3>



              {

                analysis.reasons.length > 0 ? (

                  <ul className="space-y-2">

                    {

                      analysis.reasons.map(

                        (reason, index) => (

                          <li

                            key={index}

                            className="text-red-300"

                          >

                            ⚠ {reason}

                          </li>

                        )

                      )

                    }

                  </ul>

                ) : (

                  <p className="text-green-400">

                    ✓ No suspicious indicators found

                  </p>

                )

              }

            </div>

          </div>

        </div>



        {/* ========================= */}
        {/* HASHES */}
        {/* ========================= */}

        <div className="bg-zinc-800 rounded-2xl p-6 mb-8">

          <h2 className="text-cyan-400 text-2xl font-bold mb-5">

            File Fingerprints

          </h2>



          <div className="space-y-5">

            {/* SHA256 */}

            <div>

              <p className="text-yellow-400 font-bold mb-2">

                SHA256

              </p>



              <p className="break-all text-sm text-zinc-300">

                {data.file.sha256}

              </p>

            </div>



            {/* MD5 */}

            <div>

              <p className="text-yellow-400 font-bold mb-2">

                MD5

              </p>



              <p className="break-all text-sm text-zinc-300">

                {data.file.md5}

              </p>

            </div>

          </div>

        </div>



        {/* ========================= */}
        {/* SHARE LINK */}
        {/* ========================= */}

        <div className="bg-zinc-800 rounded-2xl p-6 mb-8">

          <h2 className="text-cyan-400 text-2xl font-bold mb-5">

            Share Link

          </h2>



          <div className="flex gap-4 flex-col md:flex-row">

            <input

              type="text"

              readOnly

              value={

                `http://localhost:5173/warning/${data.file.uuid}`

              }

              className="flex-1 bg-zinc-900 border border-cyan-500 rounded-xl px-4 py-3 text-zinc-300 outline-none"

            />



            <button

              onClick={copyLink}

              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"

            >

              Copy Link

            </button>

          </div>

        </div>



        {/* ========================= */}
        {/* QUARANTINE WARNING */}
        {/* ========================= */}

        {

          data.quarantined && (

            <div className="bg-red-950 border border-red-500 rounded-xl p-5 mb-6">

              <h2 className="text-red-400 font-bold text-xl mb-3">

                File Quarantined

              </h2>



              <p className="text-red-300">

                This file was automatically quarantined
                due to suspicious activity.

              </p>

            </div>

          )

        }



        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}

        <div className="flex gap-4 flex-col md:flex-row">

          {

            !data.quarantined && (

              <Link

                to={`/warning/${data.file.uuid}`}

                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-6 rounded-2xl transition flex-1 text-center"

              >

                Download File

              </Link>

            )

          }



          <Link

            to="/dashboard"

            className="bg-zinc-700 hover:bg-zinc-600 py-4 px-6 rounded-2xl flex-1 text-center"

          >

            Dashboard

          </Link>

        </div>

      </div>

    </div>

  );

}

export default SuccessPage;
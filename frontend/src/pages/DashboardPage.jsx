import {

  useEffect,
  useState

} from "react";

import axios from "axios";



function DashboardPage() {

  const [stats, setStats] =
    useState(null);




  useEffect(() => {

    fetchStats();

  }, []);




  const fetchStats = async () => {

    try {

      const response =
        await axios.get(

          "import.meta.env.VITE_API_URL/dashboard-stats"

        );



      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };




  if (!stats) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">

        Loading Dashboard...

      </div>

    );

  }




  return (

    <div className="text-white p-6">

      {/* HEADER */}

      <h1 className="text-5xl font-bold text-cyan-400 mb-3">

        ThreatDrop Dashboard

      </h1>



      <p className="text-zinc-400 mb-10">

        Real-Time Security Monitoring

      </p>



      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL UPLOADS */}

        <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8 shadow-xl">

          <h2 className="text-zinc-400 mb-3 text-lg">

            Total Uploads

          </h2>



          <p className="text-5xl font-bold text-cyan-400">

            {stats.totalUploads}

          </p>

        </div>



        {/* QUARANTINED */}

        <div className="bg-zinc-900 border border-red-500 rounded-3xl p-8 shadow-xl">

          <h2 className="text-zinc-400 mb-3 text-lg">

            Quarantined Files

          </h2>



          <p className="text-5xl font-bold text-red-400">

            {stats.quarantinedFiles}

          </p>

        </div>



        {/* DOWNLOADS */}

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl p-8 shadow-xl">

          <h2 className="text-zinc-400 mb-3 text-lg">

            Total Downloads

          </h2>



          <p className="text-5xl font-bold text-yellow-400">

            {stats.totalDownloads}

          </p>

        </div>

      </div>



      {/* RECENT FILES */}

      <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-cyan-400 mb-8">

          Recent Uploads

        </h2>



        <div className="space-y-5">

          {

            stats.recentFiles.map(

              (file, index) => (

                <div

                  key={index}

                  className="bg-zinc-800 rounded-2xl p-5 flex justify-between items-center"

                >

                  <div>

                    <p className="font-bold text-lg break-all">

                      {file.filename}

                    </p>



                    <p className="text-zinc-400 mt-2">

                      Downloads:
                      {" "}
                      {file.downloadCount || 0}

                    </p>



                    <p className="text-zinc-500 text-sm mt-1">

                      {

                        new Date(

                          file.createdAt

                        ).toLocaleString()

                      }

                    </p>

                  </div>



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

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}

export default DashboardPage;
import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
// fresh deploy


function DashboardPage() {

  const [stats, setStats] = useState({

    totalUploads: 0,

    quarantinedFiles: 0,

    totalDownloads: 0,

    recentFiles: []

  });



  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await axios.get(

          `${import.meta.env.VITE_API_URL}/dashboard-stats`

        );



        console.log(response.data);



        setStats(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };



    fetchDashboard();

  }, []);




  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading Dashboard...

      </div>

    );

  }




  return (

    <div className="flex bg-black min-h-screen text-white">

      <Sidebar />



      <div className="flex-1 p-10">

        <h1 className="text-6xl font-bold text-cyan-400 mb-4">

          ThreatDrop Dashboard

        </h1>



        <p className="text-zinc-400 mb-10 text-xl">

          Real-Time Security Monitoring

        </p>



        {/* STATS */}

        <div className="grid grid-cols-3 gap-8 mb-10">

          <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8">

            <h2 className="text-zinc-400 text-2xl mb-4">

              Total Uploads

            </h2>



            <p className="text-6xl font-bold text-cyan-400">

              {stats.totalUploads}

            </p>

          </div>



          <div className="bg-zinc-900 border border-red-500 rounded-3xl p-8">

            <h2 className="text-zinc-400 text-2xl mb-4">

              Quarantined Files

            </h2>



            <p className="text-6xl font-bold text-red-400">

              {stats.quarantinedFiles}

            </p>

          </div>



          <div className="bg-zinc-900 border border-yellow-400 rounded-3xl p-8">

            <h2 className="text-zinc-400 text-2xl mb-4">

              Total Downloads

            </h2>



            <p className="text-6xl font-bold text-yellow-300">

              {stats.totalDownloads}

            </p>

          </div>

        </div>



        {/* RECENT FILES */}

        <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-cyan-400 mb-8">

            Recent Uploads

          </h2>



          <div className="flex flex-col gap-6">

            {stats?.recentFiles?.length > 0 ? (

              stats.recentFiles.map((file) => (

                <div

                  key={file._id}

                  className="bg-zinc-800 rounded-2xl p-6 flex justify-between items-center"

                >

                  <div>

                    <h3 className="text-2xl font-bold">

                      {file.filename}

                    </h3>



                    <p className="text-zinc-400 mt-2">

                      Downloads: {file.downloadCount || 0}

                    </p>



                    <p className="text-zinc-500 text-sm mt-1">

                      {new Date(file.createdAt).toLocaleString()}

                    </p>

                  </div>



                  <div>

                    {file.quarantined ? (

                      <span className="text-red-400 font-bold text-xl">

                        QUARANTINED

                      </span>

                    ) : (

                      <span className="text-green-400 font-bold text-xl">

                        SAFE

                      </span>

                    )}

                  </div>

                </div>

              ))

            ) : (

              <p className="text-zinc-500">

                No uploads found.

              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}



export default DashboardPage;
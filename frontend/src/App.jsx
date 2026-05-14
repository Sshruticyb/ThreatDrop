import {

  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import SuccessPage from "./pages/SuccessPage";
import WarningPage from "./pages/WarningPage";
import PhishingPage from "./pages/PhishingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
{/* redeploy */}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path=  "/login"
          element={<LoginPage />}
        />



        {/* REGISTER */}s

        <Route
          path="/register"
          element={<RegisterPage />}
        />



        {/* PROTECTED ROUTES */}

        <Route

          path="/*"

          element={

            <ProtectedRoute>

              <Layout>

                <Routes>

                  <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                  />

                  <Route
                    path="/upload"
                    element={<UploadPage />}
                  />

                  <Route
                    path="/success"
                    element={<SuccessPage />}
                  />

                  <Route
                    path="/warning/:uuid"
                    element={<WarningPage />}
                  />

                  <Route
                    path="/phishing"
                    element={<PhishingPage />}
                  />
                  <Route
  path="/history"
  element={<HistoryPage />}
/>



                  {/* DEFAULT */}

                  <Route
                    path="*"
                    element={
                      <Navigate to="/login" />
                    }
                  />

                </Routes>

              </Layout>

            </ProtectedRoute>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
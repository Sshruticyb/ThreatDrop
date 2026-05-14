import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");



  if (!token) {

    return <Navigate to="${import.meta.env.VITE_API_URL}/login" />;

  }



  return children;

}

export default ProtectedRoute;
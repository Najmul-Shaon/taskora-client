import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Shared/spinner/Spinner";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/log-in" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

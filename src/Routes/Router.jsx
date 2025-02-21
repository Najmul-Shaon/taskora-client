import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signin/Signup";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />,
    //   },
    // ],
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
]);

export default router;

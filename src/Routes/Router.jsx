import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/a",
        element: <h4>this is a home</h4>,
      },
      {
        path: "/b",
        element: <h4>this is b home</h4>,
      },
      {
        path: "/c",
        element: <h4>this is c home</h4>,
      },
    ],
  },
]);

export default router;

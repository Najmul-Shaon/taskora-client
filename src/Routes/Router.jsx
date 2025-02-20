import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h3>This is home</h3>,
    children: [
      {
        path: "/",
        element: <h4>this is sub home</h4>,
      },
    ],
  },
]);

export default router;

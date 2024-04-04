import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MainMap from "./components/mainMap.jsx";
// import ErrorPage from "./components/ErrorPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainMap />,
      }
    ],
    // errorElement: <ErrorPage />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SightingImage from "./pages/SightingImage";
import { userConfirmation } from "./components/utilities";
import SightingData from "./pages/SightingData";
import ProfilePage from "./pages/ProfilePage";
import SightingDetails from "./pages/SightingDetailsPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signup/",
        element: <SignUp />,
      },
      {
        path: "/login/",
        element: <LogIn />,
      },
      {
        path: "/sightingData/",
        element: <SightingData />,
      },
      {
        path: "/sightingImage/",
        element: <SightingImage />,
      },
      {
        path: "/profile/:profileId",
        element: <ProfilePage />,
        children: [
          {
            path: "sighting/:sightingId",
            element: <SightingDetails />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />
  },
]);

export default router;

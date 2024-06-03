import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ClientReview from "../Pages/ClientReview/ClientReview";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import AddService from "../Pages/Dashboard/AddService/AddService";
import AllService from "../Pages/Dashboard/AllService/AllService";
import EditService from "../Pages/Dashboard/EditService/EditService";
import ServiceDetails from "../Pages/Dashboard/ServiceDetails/ServiceDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/review",
        element: (
          <PrivateRoute>
            <ClientReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome />,
      },
      {
        path: "updateProfile/:id",
        element: <UpdateProfile />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },
      {
        path: "addservice",
        element: <AddService />,
      },
      {
        path: "allservice",
        element: <AllService />,
      },
      {
        path: "editservice/:id",
        element: <EditService />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
      },
      {
        path: "servicedetails/:id",
        element: <ServiceDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
      },
    ],
  },
]);

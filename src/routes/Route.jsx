import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authen/Login";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Premium from "../pages/Premium";
import Listener from "../pages/Listener";
import Blog from "../pages/Blog";
import SignUp from "../pages/Authen/SignUp";
import Friends from "../pages/Friends";
import PersonalLayout from "../layout/PersonalLayout";
const ROLES = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};
const publicRoutes = [
  { index: true, element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/premium", element: <Premium /> },
  { path: "/listeners", element: <Listener /> },
  { path: "/blogs", element: <Blog /> },
];

const customerRoutes = [
  {
    path: "chats",
    element: <Chat />,
  },
  { path: "friends", element: <Friends /> },
];
export const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "sign-up", element: <SignUp /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      ...publicRoutes,
      {
        element: <PrivateRoute allowedRoles={ROLES.CUSTOMER} />,
        children: customerRoutes,
      },
    ],
  },
  {
    path: "/personal",
    element: <PersonalLayout />,
    children: [
      {
        element: <PrivateRoute allowedRoles={ROLES.CUSTOMER} />,
        children: customerRoutes,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

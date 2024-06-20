import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { deleteCookie, getCookie } from "./utils/helperFunctions";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser, userSelector } from "./store/auth.store";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./apis/users.api";
import { Box, CircularProgress } from "@mui/joy";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import UnknownRoute from "./components/UnknownRoute";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

export const routes = {
  nonAuthRoutes: [
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <UnknownRoute />,
    },
  ],
  authRoutes: [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "explore", element: <Explore /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/create",
      element: <div>Create</div>,
    },
    {
      path: "*",
      element: <UnknownRoute />,
    },
  ],
};

function App() {
  const dispatch = useDispatch();
  const auth = !!getCookie("token");
  const { user } = useSelector(userSelector);
  const [isGetUserLoading, setIsGetUserLoading] = useState(false);

  const router = createBrowserRouter(
    auth && user ? routes.authRoutes : routes.nonAuthRoutes
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (auth && !user) {
        setIsGetUserLoading(true);
        const response = await getCurrentUser();
        if (response.success) {
          dispatch(setUser(response.data));
        } else {
          dispatch(removeUser());
          deleteCookie("token");
        }

        setIsGetUserLoading(false);
      }
    };
    fetchUser();
  }, [user, auth, dispatch]);

  if (isGetUserLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size="lg" />
      </Box>
    );
  }

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;

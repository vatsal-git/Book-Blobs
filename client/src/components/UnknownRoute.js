import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../utils/helperFunctions";
import { routes } from "../App";
import { useSelector } from "react-redux";
import { userSelector } from "../store/auth.store";

const UnknownRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = !!getCookie("token");
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (
      auth &&
      user &&
      routes.nonAuthRoutes.find((route) => pathname.includes(route.path))
    ) {
      navigate("/home");
    } else if (
      (!(auth && user) &&
        routes.authRoutes.find((route) => pathname.includes(route.path))) ||
      pathname === "/"
    ) {
      navigate("/login");
    }
  }, [auth, user, navigate, pathname]);

  return <div>404 - Page Not Found</div>;
};

export default UnknownRoute;

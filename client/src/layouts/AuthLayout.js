import { Stack } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";

const AuthLayout = () => {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", flex: 1 }}>
      <Stack sx={{ flex: 0.5 }}>
        <SideNavbar />
      </Stack>
      <Stack
        sx={{
          flex: 1.5,
          height: "100vh",
          overflowY: "auto",
          background: (theme) => theme.palette.primary[50],
        }}
      >
        <Outlet />
      </Stack>
      <Stack sx={{ flex: 0.75 }}>Following & Search</Stack>
    </Stack>
  );
};

export default AuthLayout;

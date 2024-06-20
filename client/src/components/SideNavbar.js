import React from "react";
import { Avatar, Link, Stack, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { useSelector } from "react-redux";
import { userSelector } from "../store/auth.store";
import { useLocation, useNavigate } from "react-router-dom";

const NavItem = ({ icon, label, path }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(path)}>
      {/* {icon} */}
      <Typography
        level="h4"
        fontSize={28}
        sx={{
          color: (theme) => {
            console.log({ theme });
            return pathname.includes(path)
              ? theme.palette.primary[500]
              : theme.palette.neutral[400];
          },
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};

const SideNavbar = () => {
  const { user } = useSelector(userSelector);

  return (
    <Stack sx={{ display: "flex", mt: 10, alignItems: "center" }}>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <NavItem icon={<HomeRoundedIcon />} label="Home" path="/home" />
        <NavItem
          icon={<ExploreRoundedIcon />}
          label="Explore"
          path="/explore"
        />
        <NavItem
          icon={
            <Avatar
              variant="solid"
              alt={user.username}
              src={user.profile_picture}
            />
          }
          label="Profile"
          path="/profile"
        />
        <NavItem icon={<ExploreRoundedIcon />} label="Create" path="/create" />
      </Stack>
    </Stack>
  );
};

export default SideNavbar;

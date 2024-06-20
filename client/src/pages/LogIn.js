import { Box, Button, Input, Snackbar, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apis/auth.api";
import { setCookie } from "../utils/helperFunctions";
import { defaultSnackbarState } from "../utils/defaults";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth.store";

const LogIn = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackabar, setSnackbar] = useState(defaultSnackbarState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await loginUser(data);
    setSnackbar({
      open: true,
      message: response.success
        ? "User Authenticated Successfully!"
        : response.message,
      color: response.success ? "success" : "danger",
    });

    if (response.success) {
      console.log({ data: response.data });
      setCookie("token", response.data.access_token);
      dispatch(setUser(response.data.user));
      navigate("/home");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Stack sx={{ width: 500, textAlign: "center" }}>
        <Typography level="h2" sx={{ mb: 5 }}>
          LogIn
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Input
            error={errors.username}
            startDecorator={<PersonIcon />}
            placeholder="Username*"
            variant="soft"
            {...register("username", { required: true })}
          />
          <Input
            error={errors.password}
            type="password"
            startDecorator={<KeyIcon />}
            placeholder="Password*"
            variant="soft"
            {...register("password", { required: true })}
          />
          <Button type="submit">LogIn</Button>
        </Box>
        <Typography>
          Not a member?{" "}
          <Link underline="always" onClick={() => navigate("/signup")}>
            SignUp
          </Link>
        </Typography>
      </Stack>
      {snackabar.open && (
        <Snackbar
          key="signup-snackbar"
          variant="solid"
          open={snackabar.open}
          color={snackabar.color}
          autoHideDuration={2000}
          onClose={() =>
            setSnackbar({
              open: false,
              message: "",
              color: "",
            })
          }
        >
          {snackabar.message}
        </Snackbar>
      )}
    </Box>
  );
};

export default LogIn;

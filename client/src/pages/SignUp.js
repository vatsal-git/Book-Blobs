import {
  Box,
  Button,
  Input,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/auth.api";

const SignUp = () => {
  const [snackabar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await registerUser(data);
    setSnackbar({
      open: true,
      message: response.success
        ? "User Registered Successfully!"
        : response.message,
      color: response.success ? "success" : "danger",
    });
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
          SignUp
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
            error={errors.email}
            type="email"
            startDecorator={<MailIcon />}
            placeholder="Email*"
            variant="soft"
            {...register("email", { required: true })}
          />
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
          <Button type="submit">SignUp</Button>
        </Box>
        <Typography>
          Already have an account?{" "}
          <Link underline="always" onClick={() => navigate("/login")}>
            LogIn
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

export default SignUp;

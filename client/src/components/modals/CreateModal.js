import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Textarea,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateModal = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log({ data });
    // const response = await loginUser(data);
    // setSnackbar({
    //   open: true,
    //   message: response.success
    //     ? "User Authenticated Successfully!"
    //     : response.message,
    //   color: response.success ? "success" : "danger",
    // });

    // if (response.success) {
    //   console.log({ data: response.data });
    //   //   setCookie("token", response.data.access_token);
    //   //   dispatch(setUser(response.data.user));
    //   navigate("/home");
    // }
  };

  return (
    <Modal
      open={true}
      onClose={() => {
        
      }}
    >
      <ModalDialog sx={{ width: 600 }}>
        <DialogTitle>Create new Book Blob</DialogTitle>
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
            error={errors.title}
            placeholder="Post Title"
            {...register("title", { required: true })}
          />
          <Textarea
            minRows={6}
            error={errors.password}
            placeholder="Write a book summary..."
          />
          <Input
            error={errors.author}
            placeholder="Author"
            {...register("author", { required: true })}
          />
          {/* <Input
            error={errors.password}
            type="password"
            placeholder="Password*"
            variant="soft"
            {...register("password", { required: true })}
          /> */}
          <Button type="submit">LogIn</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default CreateModal;

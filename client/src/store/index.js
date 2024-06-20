import { configureStore } from "@reduxjs/toolkit";
import user from "./auth.store";

const store = configureStore({
  reducer: {
    user: user,
  },
});

export default store;

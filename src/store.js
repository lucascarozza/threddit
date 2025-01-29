import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./features/feedSlice";
import subredditsReducer from "./features/subredditsSlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    subreddits: subredditsReducer,
  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import he from "he";

const REDDIT_ROOT = "https://www.reddit.com";

export const fetchSubreddits = createAsyncThunk(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetch(`${REDDIT_ROOT}/subreddits/popular/.json`);
    const data = await response.json();

    return data.data.children.map((subreddit) => ({
      id: subreddit.data.id,
      name: subreddit.data.display_name,
      url: subreddit.data.url,
      icon:
        subreddit.data.icon_img ||
        he.decode(subreddit.data.community_icon) ||
        "/default_icon.png",
    }));
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subredditsSlice.reducer;

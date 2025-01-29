import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REDDIT_ROOT = "https://www.reddit.com";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (subreddit = "popular") => {
    const response = await fetch(`${REDDIT_ROOT}/r/${subreddit}/.json`);
    const data = await response.json();

    return data.data.children.map((post) => ({
      id: post.data.id,
      subreddit: post.data.subreddit,
      title: post.data.title,
      text: post.data.selftext || null,
      created: post.data.created_utc,
      score: post.data.score,
      media: extractPostMedia(post.data) || null,
      link:
        post.data.url !== `${REDDIT_ROOT}${post.data.permalink}`
          ? post.data.url
          : null,
    }));
  }
);

export const searchPosts = createAsyncThunk(
  "feed/searchPosts",
  async (searchTerm) => {
    const response = await fetch(`${REDDIT_ROOT}/search/.json?q=${searchTerm}`);
    const data = await response.json();

    return data.data.children.map((post) => ({
      id: post.data.id,
      subreddit: post.data.subreddit,
      title: post.data.title,
      text: post.data.selftext || null,
      created: post.data.created_utc,
      score: post.data.score,
      media: extractPostMedia(post.data) || null,
      link:
        post.data.url !== `${REDDIT_ROOT}${post.data.permalink}`
          ? post.data.url
          : null,
    }));
  }
);

const extractPostMedia = (post) => {
  if (post.media?.reddit_video?.fallback_url) {
    return [{ type: "video", url: post.media.reddit_video.fallback_url }];
  }

  if (
    post.url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
    post.url.includes("i.redd.it") ||
    post.url.includes("i.imgur.com")
  ) {
    return [{ type: "image", url: post.url }];
  }

  return null;
};

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    currentSubreddit: "popular",
  },
  reducers: {
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentSubreddit } = feedSlice.actions;
export default feedSlice.reducer;
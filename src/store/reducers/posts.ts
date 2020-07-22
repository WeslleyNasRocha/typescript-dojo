import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiPostResponse, Post } from "../../utils/Types";

const fetchAllPosts = createAsyncThunk<Array<ApiPostResponse>>(
  "post/fetchAllPost",
  async () => {
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!postResponse.ok) {
      throw new Error("Ocorreu um erro");
    }
    return await postResponse.json();
  }
);

const fetchPostsByUser = createAsyncThunk<Array<ApiPostResponse>, number>(
  "post/fetchPostsByUser",
  async (userId) => {
    const postResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!postResponse.ok) {
      throw new Error("Ocorreu um erro");
    }

    const posts = await postResponse.json();

    if (Array.isArray(posts) && posts.length === 0) {
      throw new Error("Não existe posts desse usuario");
    }

    return posts;
  }
);

export type PostState = {
  loading: "idle" | "pending";
  data: Post[];
  error?: string;
};

const initialState: PostState = {
  loading: "idle",
  data: [],
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.pending.toString()]: (state) => {
      state.error = undefined;
      state.loading = "pending";
    },
    [fetchAllPosts.fulfilled.toString()]: (
      state,
      action: ReturnType<typeof fetchAllPosts.fulfilled>
    ) => {
      state.loading = "idle";
      state.data = action.payload;
    },
    [fetchAllPosts.rejected.toString()]: (
      state,
      action: ReturnType<typeof fetchAllPosts.rejected>
    ) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [fetchPostsByUser.pending.toString()]: (state) => {
      state.loading = "pending";
    },
    [fetchPostsByUser.fulfilled.toString()]: (
      state,
      action: ReturnType<typeof fetchPostsByUser.fulfilled>
    ) => {
      state.loading = "idle";
      state.data = action.payload;
    },
    [fetchPostsByUser.rejected.toString()]: (
      state,
      action: ReturnType<typeof fetchPostsByUser.rejected>
    ) => {
      state.loading = "idle";
      state.data = [];
      state.error = action.error.message;
    },
  },
});

export default PostSlice.reducer;

export const PostActions = {
  ...PostSlice.actions,
  fetchAllPosts,
  fetchPostsByUser,
};

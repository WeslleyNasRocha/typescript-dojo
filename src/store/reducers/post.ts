import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const fetchAllPosts = createAsyncThunk<Post[]>(
  "post/fetchAllPosts",
  async () => {
    const postsResponse = await api<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!postsResponse.ok || !postsResponse.parsedBody) {
      throw new Error("Ocorreu um erro ao buscar os posts");
    }
    return postsResponse.parsedBody;
  }
);

const fetchPostsForUser = createAsyncThunk<Post[], number>(
  "post/fetchPostsForUser",
  async (userId) => {
    if (!userId) {
      throw new Error("O userId não pode ser nulo");
    }
    const postsResponse = await api<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!postsResponse.ok) {
      throw new Error("Ocorreu um erro ao buscar os posts");
    }
    const posts = postsResponse.parsedBody;

    if (!posts || (Array.isArray(posts) && posts.length === 0)) {
      throw new Error("Não há posts para o usuario selecionado");
    }

    return posts;
  }
);

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostState = {
  loading: "idle" | "pending" | "error";
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
      state.loading = "pending";
      state.error = undefined;
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
      state.loading = "error";
      state.error = action.error.message;
    },
    [fetchPostsForUser.pending.toString()]: (state) => {
      state.loading = "pending";
      state.error = undefined;
    },
    [fetchPostsForUser.fulfilled.toString()]: (
      state,
      action: ReturnType<typeof fetchPostsForUser.fulfilled>
    ) => {
      state.loading = "idle";
      state.data = action.payload;
    },
    [fetchPostsForUser.rejected.toString()]: (
      state,
      action: ReturnType<typeof fetchPostsForUser.rejected>
    ) => {
      state.loading = "error";
      state.error = action.error.message;
    },
  },
});

export default PostSlice.reducer;

export const PostActions = {
  ...PostSlice.actions,
  fetchAllPosts,
  fetchPostsForUser,
};

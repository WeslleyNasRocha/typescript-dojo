import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../../utils/uid";

export interface Todo {
  id: string;
  completed: boolean;
  text: string;
}

type TodoState = {
  loading: "idle" | "pending" | "error";
  data: Todo[];
  errors: { [x: string]: string };
};

const addTodoAsync = createAsyncThunk(
  "todo/createTodoAsync",
  async (text: string) => {
    await new Promise((r) => setTimeout(r, 2000));
    if (text) {
      return text;
    }
    throw new Error("Text must not be empty async");
  }
);

const initialState: TodoState = {
  loading: "idle",
  data: [
    {
      id: "1",
      text: "Type all the things",
      completed: false,
    },
    {
      id: "2",
      text: "Hype the hypescript",
      completed: false,
    },

    {
      id: "3",
      text: "Buy milk",
      completed: true,
    },
  ],
  errors: {},
};

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.errors = {};
        state.loading = "idle";
        state.data?.push({
          id: generateId(),
          text: action.payload,
          completed: false,
        });
      } else {
        state.loading = "error";
        state.errors["creation"] = "The text must not be empty";
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data = state.data.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: {
    [addTodoAsync.pending.toString()]: (state) => {
      state.loading = "pending";
    },
    [addTodoAsync.fulfilled.toString()]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.errors = {};
      state.loading = "idle";
      state.data?.push({
        id: generateId(),
        text: action.payload,
        completed: false,
      });
    },
    [addTodoAsync.rejected.toString()]: (
      state,
      action: PayloadAction<null, string, null, Error>
    ) => {
      state.loading = "error";
      state.errors["creation"] = action.error.message;
    },
  },
});

export default TodoSlice.reducer;

export const TodoActions = {
  ...TodoSlice.actions,
  addTodoAsync,
};

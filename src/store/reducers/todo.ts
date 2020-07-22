import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../../utils/generateId";
import { Todo } from "../../utils/Types";

type TodoState = {
  loading: "idle" | "pending";
  data: Array<Todo>;
  error?: string;
};

const initialState: TodoState = {
  loading: "idle",
  data: [
    {
      id: "1",
      completed: false,
      text: "poing",
    },
  ],
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.data.push({
        id: generateId(),
        completed: false,
        text: action.payload,
      });
    },
    checkTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((todo) => {
        if (action.payload === todo.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
  },
});

export default TodoSlice.reducer;

export const TodoActions = {
  ...TodoSlice.actions,
};

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles,
  TextField
} from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import TodoItem from "../components/TodoItem";
import { generateId } from "../utils/uid";

interface TodoProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(0, 2, 2, 0),
  },
  todoListContainer: {
    margin: theme.spacing(2, 2),
  },
}));

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export const LocalTodoScreen: FunctionComponent<TodoProps> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const classes = useStyles();

  const handleToggleTodo = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleDeleteTodo = (todoId: string) => {
    const newTodos = todos.filter(({ id }) => id !== todoId);
    setTodos(newTodos);
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Card>
        <CardHeader title="Todos"></CardHeader>
        <CardContent>
          <TextField
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            className={classes.input}
            placeholder="A thing i must do"
          />
          <Button
            onClick={() => {
              setTodos([
                ...todos,
                { id: generateId(), text: inputText, completed: false },
              ]);
              setInputText("");
            }}
            variant="outlined"
            color="primary"
          >
            Add
          </Button>

          <Divider />
          <div className={classes.todoListContainer}>
            {todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  data={todo}
                  onCheck={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LocalTodoScreen;

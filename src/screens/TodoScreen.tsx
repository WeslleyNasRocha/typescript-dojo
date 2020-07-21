import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { RootState } from "../store/reducers";
import { TodoActions } from "../store/reducers/todo";
import { AppDispatch } from "../store/store";

interface TodoProps
  extends RouteComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {
  id: number;
}

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

export const TodoScreen: FunctionComponent<TodoProps> = (props) => {
  const [todoText, setTodoText] = useState("");
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <Card>
        <CardHeader title="Todos"></CardHeader>
        <CardContent>
          <TextField
            disabled={props.todos.loading === "pending"}
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
            className={classes.input}
            placeholder="A thing i must do"
            error={props.todos.loading === "error"}
            helperText={props.todos.errors["creation"]}
          />
          <Button
            disabled={props.todos.loading === "pending"}
            onClick={() => {
              props.addTodo(todoText);
              setTodoText("");
            }}
            variant="outlined"
            color="primary"
          >
            Add
          </Button>
          <Button
            disabled={props.todos.loading === "pending"}
            onClick={() => {
              props.addTodoAsync(todoText);
              setTodoText("");
            }}
            variant="outlined"
            color="primary"
          >
            Add after 2 seconds
          </Button>

          <Divider />
          <div className={classes.todoListContainer}>
            {props.todos.data?.map((todo) => (
              <TodoItem
                key={todo.id}
                data={todo}
                onClick={(id) => {
                  props.toggleTodo(id);
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.Todos,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);

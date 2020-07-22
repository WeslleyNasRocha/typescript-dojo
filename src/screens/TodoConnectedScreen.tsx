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
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import TodoItem from "../components/TodoItem";
import { AppDispatch } from "../store";
import { RootState } from "../store/reducers";
import { TodoActions } from "../store/reducers/todo";

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

type TodoConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    id: number;
  };

const TodoConnectedScreen: FunctionComponent<TodoConnectedProps> = (props) => {
  const { todo, addTodo, checkTodo, deleteTodo } = props;
  const [inputText, setInputText] = useState("");
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    addTodo(inputText);
    setInputText("");
  };

  const handleCheck = (id: string) => {
    checkTodo(id);
  };

  const handleDelete = (idToDelete: string) => {
    deleteTodo(idToDelete);
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Card>
        <CardHeader title="Todos c/ Redux"></CardHeader>
        <CardContent>
          <TextField
            value={inputText}
            onChange={handleChange}
            placeholder="A thing i must do"
          />
          <Button onClick={handleAdd}>Add</Button>
          <Divider />
          <div className={classes.todoListContainer}>
            {todo.data.map((item) => {
              return (
                <TodoItem
                  data={item}
                  onCheck={handleCheck}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  todo: state.todo,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(TodoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoConnectedScreen);

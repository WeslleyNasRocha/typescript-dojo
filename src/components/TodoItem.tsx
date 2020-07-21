import { Grid, makeStyles, Typography } from "@material-ui/core";
import MdCheckBox from "@material-ui/icons/CheckBox";
import MdCheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import IconDelete from "@material-ui/icons/Delete";
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { Todo } from "../store/reducers/todo";

interface TodoItemProps {
  data: Todo;
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({
  checkbox: {
    cursor: "pointer",
  },
  text: {
    textDecoration: "none",
    marginLeft: theme.spacing(2),
    "&.completed": {
      textDecoration: "line-through",
      color: "#aaa",
    },
  },
  trash: {
    cursor: "pointer",
  },
}));

const TodoItem: FunctionComponent<TodoItemProps> = ({
  data,
  onCheck,
  onDelete,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        item
        onClick={() => {
          onCheck(data.id);
        }}
        xs={1}
        className={classes.checkbox}
      >
        {data.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </Grid>
      <Grid item xs={10}>
        <Typography
          className={clsx(classes.text, { completed: data.completed })}
        >
          {data.text}
        </Typography>
      </Grid>
      <Grid
        className={classes.trash}
        onClick={() => {
          onDelete(data.id);
        }}
        item
        xs={1}
      >
        <IconDelete />
      </Grid>
    </Grid>
  );
};

export default TodoItem;

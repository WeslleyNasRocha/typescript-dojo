import { Box, makeStyles, Typography } from "@material-ui/core";
import MdCheckBox from "@material-ui/icons/CheckBox";
import MdCheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { Todo } from "../store/reducers/todo";

interface TodoItemProps {
  data: Todo;
  onClick: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({
  text: {
    textDecoration: "none",
    marginLeft: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
    "&.completed": {
      textDecoration: "line-through",
      color: "#aaa",
    },
  },
}));

const TodoItem: FunctionComponent<TodoItemProps> = ({ data, onClick }) => {
  const classes = useStyles();
  return (
    <Box
      onClick={() => {
        onClick(data.id);
      }}
      display="flex"
      flexDirection="row"
    >
      {data.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      <Typography className={clsx(classes.text, { completed: data.completed })}>
        {data.text}
      </Typography>
    </Box>
  );
};

export default TodoItem;

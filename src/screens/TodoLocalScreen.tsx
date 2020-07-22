import React, { useState } from 'react';
import { Container, Card, CardHeader, CardContent, TextField, Button, makeStyles, Divider } from "@material-ui/core";
import TodoItem from "../components/TodoItem";
import { generateId } from "../utils/generateId";

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

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
}

const TodoLocalScreen = () => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [inputText, setInputText] = useState("");
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }


    const handleAdd = () => {
        setTodos([
            ...todos,
            { id: generateId(), text: inputText, completed: false },
        ]);
        setInputText("");
    }

    const handleCheck = (id: string) => {
        const newTodos = todos.map(todo => {
            if (id === todo.id) {
                return {...todo, completed: !todo.completed}
            }
            return todo;
        })

        setTodos(newTodos);
    }

    const handleDelete=(idToDelete: string) => {
        const newTodos = todos.filter(({id})=> id !== idToDelete);
        setTodos(newTodos);
    }

    return (
        <Container className={classes.root} maxWidth="sm">
            <Card>
                <CardHeader title="Todos"></CardHeader>
                <CardContent>
                    <TextField value={inputText} onChange={handleChange} placeholder="A thing i must do" />
                    <Button onClick={handleAdd} >Add</Button>
                    <Divider />
                    <div className={classes.todoListContainer}>
                        {todos.map((item) => {
                            return (<TodoItem data={item} onCheck={handleCheck} onDelete={handleDelete} />)
                        })}
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default TodoLocalScreen;
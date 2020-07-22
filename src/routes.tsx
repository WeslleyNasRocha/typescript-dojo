import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App"
import TodoLocalScreen from "./screens/TodoLocalScreen";

export const AppRoutes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/app/localTodo" component={TodoLocalScreen} />
        </Switch>

    </BrowserRouter>)
}
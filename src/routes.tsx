import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import App from "./App";
import AppWrapper from "./components/AppWrapper";
import FetchScreen from "./screens/FetchScreen";
import TodoScreen from "./screens/TodoScreen";
import LocalTodoScreen from "./screens/TodoScreenLocal";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/app">
          {(props) => (
            <AppWrapper navigator={props}>
              <Route exact path="/app/todos" component={TodoScreen} />
              <Route exact path="/app/localTodo" component={LocalTodoScreen} />
              <Route exact path="/app/fetch" component={FetchScreen} />
            </AppWrapper>
          )}
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

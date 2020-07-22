import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App"
import TodoLocalScreen from "./screens/TodoLocalScreen";
import AppWrapper from "./components/AppWrapper";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                
                <Route path="/app">
                {(props) => (
                    <AppWrapper navigator={props}>
                        {/* <Route exact path="/app/todos" component={TodoScreen} /> */}
                        <Route exact path="/app/localTodo" component={TodoLocalScreen} />
                        {/* <Route exact path="/app/fetch" component={FetchScreen} /> */}
                    </AppWrapper>
                )}
                </Route>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}
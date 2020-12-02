import React from "react";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            <Navigation />
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Redirect from="*" to="/" />
                </> 
                ) : (
                    <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                    <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;

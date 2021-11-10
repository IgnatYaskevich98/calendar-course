import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {AuthStateType} from "../store/reducers/auth/authReducer";

export const AppRouter = () => {
    const {isAuth} = useSelector<RootState, AuthStateType>(state => state.auth)
    return (
        isAuth ? <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>)
                }
                <Redirect to={RouteNames.EVENT}/>
            </Switch>
            : <Switch>
                {publicRoutes.map(route =>
                    <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>)

                }
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    );
};


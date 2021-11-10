import React from "react";
import {Login} from "../page/Login";
import {Event} from "../page/Event";

export type IRoute = {
    path: string
    component: React.ComponentType
    exact?: boolean
}

export enum RouteNames {
    LOGIN = `/login`,
    EVENT = `/`,
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]
export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, exact: true, component: Event}
]

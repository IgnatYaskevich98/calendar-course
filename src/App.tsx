import React, {useEffect} from 'react';
import {AppRouter} from "./components/AppRouter";
import {Layout} from "antd";
import {NavBar} from "./components/NavBar";
import './App.css'
import {useActions} from "./hooks/useActions";
import {IUser} from "./store/reducers/auth/authReducer";

export const App = () => {
    const {setUser, setIsAuth} = useActions()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('userName' || '')} as IUser)
            setIsAuth(true)
        }
    }, [])
    return (
        <Layout>
            <NavBar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
}

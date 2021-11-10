import React from 'react';
import {Header} from "antd/es/layout/layout";
import {Menu, Row} from 'antd';
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {AuthStateType} from "../store/reducers/auth/authReducer";
import {useActions} from "../hooks/useActions";

export const NavBar = React.memo(() => {
    const router = useHistory()
    const {isAuth, user} = useSelector<RootState, AuthStateType>(state => state.auth)
    const {logout} = useActions()
    return (
        <Header>
            <Row justify={'end'}>
                {isAuth
                    ? <>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                            <Menu.Item onClick={logout} key={1}>
                                Logout
                            </Menu.Item>
                        </Menu>
                    </>
                    : <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                        <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>
                            LOGIN
                        </Menu.Item>
                    </Menu>}
            </Row>
        </Header>
    );
});

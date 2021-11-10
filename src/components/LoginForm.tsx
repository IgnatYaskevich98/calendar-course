import React, {FC, useCallback, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {AuthStateType} from "../store/reducers/auth/authReducer";
import {useActions} from "../hooks/useActions";

export const LoginForm: FC = () => {
    const {isLoading, error} = useSelector<RootState, AuthStateType>(state => state.auth)
    // кастомный хук
    const {login} = useActions()
    const [userName, setUserName] = useState('user')
    const [password, setSetPassword] = useState('123')
    const submit = useCallback(() => login(userName, password), [login, userName, password])
    return (
        <Form onFinish={submit}>
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Enter your username!')]}>
                <Input value={userName} onChange={e => setUserName(e.currentTarget.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Enter your password!')]}>
                <Input.Password value={password} onChange={e => setSetPassword(e.currentTarget.value)}/>
            </Form.Item>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
            <div>login: user, password: 123</div>
        </Form>
    );
};

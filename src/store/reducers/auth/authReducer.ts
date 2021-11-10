import {AuthActionEnum, AuthActions} from "./auth-action-creator";

export type IUser = { username: string, password: string }
export type AuthStateType = {
    isAuth: boolean
    user: IUser
    isLoading: boolean
    error: string
}
const authState: AuthStateType = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: '',
}
export const authReducer = (state: AuthStateType = authState, action: AuthActions): AuthStateType => {
    switch (action.type) {
        case AuthActionEnum.SET_IS_AUTH:
            return {...state, isAuth: action.payload}
        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload}
        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}


import {IUser} from "./authReducer";
import {AppDispatch} from "../../store";
import {Dispatch} from "redux";
import axios from "axios";

export enum AuthActionEnum {
    SET_IS_AUTH = 'SET_AUTH',
    SET_ERROR = 'SET_ERROR',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

type SetUserAction = { type: AuthActionEnum.SET_USER, payload: IUser }
type SetIsAuthAction = { type: AuthActionEnum.SET_IS_AUTH, payload: boolean }
type SetError = { type: AuthActionEnum.SET_ERROR, payload: string }
type SetIsLoading = { type: AuthActionEnum.SET_IS_LOADING, payload: boolean }

export  type AuthActions = SetIsAuthAction | SetError | SetUserAction | SetIsLoading

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload: auth}),
    setError: (payload: string): SetError => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoading => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    login: (userName: string, password: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./users.json')
                const mockUser = response.data.find(user => user.username === userName && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('userName', mockUser.username)
                    dispatch(AuthActionCreators.setIsAuth(true))
                    dispatch(AuthActionCreators.setUser(mockUser))
                } else {
                    dispatch(AuthActionCreators.setError('Некоректный логин или пороль'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
        }
    },
    logout: () => async (dispatch: Dispatch) => {
        dispatch(AuthActionCreators.setIsAuth(true))
        localStorage.removeItem('auth')
        localStorage.removeItem('userName')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    },
}
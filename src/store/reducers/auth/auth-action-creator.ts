import {IUser} from "./authReducer";
import {Dispatch} from "redux";
import {usersService} from "../../../api/api";

export enum AuthActionEnum {
    SET_IS_AUTH = 'SET_AUTH',
    SET_ERROR = 'SET_ERROR',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

const {SET_IS_AUTH, SET_ERROR, SET_USER, SET_IS_LOADING} = AuthActionEnum

export const AuthActionCreators = {
    setUser: (user: IUser) => ({type: SET_USER, payload: user} as const),
    setIsAuth: (auth: boolean) => ({type: SET_IS_AUTH, payload: auth} as const),
    setError: (payload: string) => ({type: SET_ERROR, payload} as const),
    setIsLoading: (payload: boolean) => ({type: SET_IS_LOADING, payload} as const),
    login: (userName: string, password: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout(async () => {
                const response = await usersService.getUsers()
                const mockUser = response.data.find(user => user.username === userName && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('userName', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
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
export  type AuthActions = ReturnType<typeof AuthActionCreators.setUser> |
    ReturnType<typeof AuthActionCreators.setIsAuth> |
    ReturnType<typeof AuthActionCreators.setError> |
    ReturnType<typeof AuthActionCreators.setIsLoading>

import axios from "axios";
import {IUser} from "../store/reducers/auth/authReducer";

const instance = axios.create({
    baseURL: `./users.json`,
})

export const usersService = {
    getUsers() {
        return instance.get<IUser[]>(``)
    }
}
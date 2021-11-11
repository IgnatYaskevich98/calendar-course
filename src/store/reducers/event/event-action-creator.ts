import {IUser} from "../auth/authReducer";
import {IEventType} from "../../../components/EventCalendar";
import {Dispatch} from "redux";
import {usersService} from "../../../api/api";


export type EventAction = ReturnType<typeof EventActionCreators.setGuests>
    | ReturnType<typeof EventActionCreators.setEvents>

export enum EventActionEnum {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS',
}

const {SET_EVENTS, SET_GUESTS} = EventActionEnum
export const EventActionCreators = {
    setGuests: (payload: IUser[]) => ({type: SET_GUESTS, payload} as const),
    setEvents: (payload: IEventType[]) => ({type: SET_EVENTS, payload} as const),
    fetchGuests: () => async (dispatch: Dispatch) => {
        try {
            const response = await usersService.getUsers()
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
        }
    },
    createEvent: (event: IEventType) => async (dispatch: Dispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEventType[]
            json.push(event)
            dispatch(EventActionCreators.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
        }
    },
    fetchEvent: (userName: string) => async (dispatch: Dispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEventType[]
            const currentUserEvents = json.filter(ev => ev.author === userName || ev.guest === userName)
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
        }
    }
}
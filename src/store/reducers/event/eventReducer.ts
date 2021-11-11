import {IUser} from "../auth/authReducer";
import {IEventType} from "../../../components/EventCalendar";
import {EventAction, EventActionEnum} from "./event-action-creator";

export type EventStateType = {
    guests: IUser[],
    events: IEventType[]
}
export const eventState: EventStateType = {
    events: [],
    guests: [],
}
const {SET_EVENTS, SET_GUESTS} = EventActionEnum
export const eventReducer = (state: EventStateType = eventState, action: EventAction): EventStateType => {
    switch (action.type) {
        case SET_GUESTS:
            return {...state, guests: action.payload}
        case SET_EVENTS:
            return {...state, events: action.payload}
        default:
            return state
    }
}

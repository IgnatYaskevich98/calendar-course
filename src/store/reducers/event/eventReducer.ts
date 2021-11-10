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
export const eventReducer = (state: EventStateType = eventState, action: EventAction): EventStateType => {
    switch (action.type) {
        case EventActionEnum.SET_GUESTS:
            return {...state, guests: action.payload}
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
        default:
            return state
    }
}

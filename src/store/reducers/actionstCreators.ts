import {AuthActionCreators} from "./auth/auth-action-creator";
import {EventActionCreators} from "./event/event-action-creator";

export const allActionCreators = {...AuthActionCreators, ...EventActionCreators,}
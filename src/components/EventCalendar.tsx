import React, {FC} from 'react';
import {Calendar} from "antd";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

export  type IEventType = {
    author: string;
    guest: string
    date: string
    description: string
}
type EventCalendarType = { events: IEventType[] }

export const EventCalendar: FC<EventCalendarType> = ({events}) => {
    const dateCellRender = (value: Moment) => {
        const fDate = formatDate(value.toDate())
        const currentDayEvents = events.filter(ev => ev.date === fDate)
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>)}
            </div>);
    }
    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};


import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {AuthStateType, IUser} from "../store/reducers/auth/authReducer";
import {IEventType} from "./EventCalendar";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

type EventFormType = {
    guests: IUser[],
    submit: (event: IEventType) => void
}
export const EventForm: FC<EventFormType> = ({guests, submit}) => {
    const [event, setEvent] = useState<IEventType>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as IEventType)
    const {user} = useSelector<RootState, AuthStateType>(state => state.auth)
    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }
    const submitForm = () => submit({...event, author: user.username})
    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Name event"
                name="description"
                rules={[rules.required('Event description')]}>
                <Input value={event.description} onChange={e => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <Form.Item label="Event date"
                       name="date"
                       rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}>
                <DatePicker onChange={(date) => selectDate(date)}/>
            </Form.Item>
            <Form.Item>
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify={'center'}>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};


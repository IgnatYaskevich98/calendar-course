import React, {useCallback, useEffect, useState} from 'react';
import {EventCalendar, IEventType} from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import {useActions} from "../hooks/useActions";
import {EventForm} from "../components/EventForm";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {EventStateType} from "../store/reducers/event/eventReducer";
import {AuthStateType} from "../store/reducers/auth/authReducer";

export const Event = React.memo(() => {
    const [modalVisible, setModalVisible] = useState(false)
    const {user} = useSelector<RootState, AuthStateType>(state => state.auth)
    const {guests, events} = useSelector<RootState, EventStateType>(state => state.event)
    const {fetchGuests, createEvent, fetchEvent} = useActions()
    useEffect(() => {
        fetchGuests()
        fetchEvent(user.username)
    }, [])
    const addNewEvent = useCallback((event: IEventType) => {
        setModalVisible(false)
        createEvent(event)
    }, [])
    return (
        <Layout style={{margin: '5px'}}>
            <EventCalendar events={events}/>
            <Row justify={'center'}>
                <Button style={{backgroundColor: 'azure'}} onClick={() => setModalVisible(true)}>Add event</Button>
            </Row>
            <Modal title="Add event" visible={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </Layout>
    );
});


import React, { useState, useEffect } from 'react';
import style from './styles.sass';

// Блок сообщений, по умолчанию имеет тип 'Ошибка'
// требуется доработать функционал, с тем если приходит несколько ошибок( одинаковых и разных )

const MessageBox = (props) => {
    const [toggleMessageVision, setToggleMessageVision] = useState(false)

    useEffect(() => {
        if (props.text) {
            setToggleMessageVision(true)
            setTimeout(() => {
                setToggleMessageVision(false)
                props.clearMessage()
            }, props.timeout || 5000);
        }
    }, [props.text])

    return (
        <>
            { 
                toggleMessageVision &&
                <span className={style.MessageBox}> {props.text} </span>
            }
        </>
    )
}

export default MessageBox;
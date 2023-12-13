import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Message from './Message';

import styles from '../../styles/window.module.scss';

type MessageProps = {
    task?: any, 
    moveToRecycle: () => void
}

const DeleteMessage = ({task, moveToRecycle}: MessageProps) => {

    const [open, setOpen] = useState(true);

    const buttonRef = useRef<any>()

    const closeMessage = () => {
        setOpen(false);
        moveToRecycle();
    }

    useLayoutEffect(() => {
      buttonRef.current.focus()
    }, [])

    return (
        <>
            {
                open ? <Message>
                    <WindowHeader className={styles.title}>
                        <div className={styles.top}> <span>Confirm File Delete</span> </div>
                        <div className={styles.controlBtns}>
                            <button disabled> <span className={styles.close} /> </button>
                        </div>
                    </WindowHeader>
                    <WindowContent className={styles.content}>
                        <div className={styles.contentContainer}>
                            <figure><img src={`/${task.icon}`} /></figure>
                            <div className={styles.body}>
                                Are you sure you want to send {task.title} to the Recycle Bin?
                            </div>
                        </div>
                        <button ref={buttonRef} onClick={closeMessage} tabIndex={0}>OK</button>
                    </WindowContent>
                </Message> : null
            }
        </>
    )
}

export default DeleteMessage;
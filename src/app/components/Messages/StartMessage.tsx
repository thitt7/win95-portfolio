import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import Message from './Message';
import asyncDelay from '@/lib/asyncDelay';

import styles from '../../styles/window.module.scss';

const StartMessage = ({ children, type, title}: { children?: React.ReactNode, type?: string, title: string }) => {

    const [open, setOpen] = useState(true);

    const buttonRef = useRef<any>()

    const closeMessage = () => {
        setOpen(false)
    }

    useLayoutEffect(() => {
      buttonRef.current.focus()
    }, [])

    return (
        <>
            {
                open ? <Message type={type} title={title}>
                    <WindowHeader className={styles.title}>
                        <div className={styles.top}> <span>{title}</span> </div>
                        <div className={styles.controlBtns}>
                            <button disabled> <span className={styles.close} /> </button>
                        </div>
                    </WindowHeader>
                    <WindowContent className={styles.content}>
                        <div className={styles.contentContainer}>
                            <figure><img src={`/msg_${type}.ico`} alt={`${type} image`} /></figure>
                            <div className={styles.body}>{children}</div>
                        </div>
                        <button ref={buttonRef} onClick={closeMessage} tabIndex={0}>OK</button>
                    </WindowContent>
                </Message> : null
            }
        </>
    )
}

export default StartMessage;
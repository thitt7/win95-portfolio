import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Message from './Message';
import asyncDelay from '@/lib/asyncDelay';

import styles from '../../styles/window.module.scss';

type MessageProps = {
    task?: any, 
    moveToRecycle: () => void
}

const DeleteMessage = ({task, moveToRecycle}: MessageProps) => {

    const [open, setOpen] = useState(true);
    const buttonRef = useRef<any>();

    const capitalized = task.type.charAt(0).toUpperCase() + task.type.substring(1)

    const closeMessage = () => {
        setOpen(false);
        moveToRecycle();
    }

    useEffect(() => {
        buttonRef.current ? buttonRef.current.focus() : '';
      })

    return (
        <>
            {
                open ? <Message>
                    <WindowHeader className={styles.title}>
                        <div className={styles.top}> <span>Confirm {capitalized} Delete</span> </div>
                        <div className={styles.controlBtns}>
                            <button onClick={()=>setOpen(false)}> <span className={styles.close} /> </button>
                        </div>
                    </WindowHeader>
                    <WindowContent className={styles.content}>
                        <div className={styles.contentContainer}>
                            <figure><img src={task.type == 'folder' ? '/w95_53.ico' : '/w95_52.ico'} /></figure>
                            <div className={styles.body}>
                                {task.type == "file" ? <>Are you sure you want to send '{task.title}' to the Recycle Bin?</> : null}
                                {task.type == "folder" ? <>Are you sure you want to remove the folder '{task.title}' and move all its contents to the Recycle Bin?</> : null}
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
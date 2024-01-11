import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { WindowContent, WindowHeader } from 'react95';
import Message from './Message';

import styles from '../../styles/window.module.scss';

type MessageProps = {
    task?: any,
    selected?: any[],
    closeMessage: () => void,
    moveToRecycle: () => void
}

const DeleteMessage = ({task, selected, closeMessage, moveToRecycle}: MessageProps) => {

    const closeButtonRef = useRef<any>();

    const capitalized = task.type.charAt(0).toUpperCase() + task.type.substring(1)

    const Close = () => {
        // setOpen(false);
        closeMessage();
        moveToRecycle();
    }

    useEffect(() => {
        closeButtonRef.current ? closeButtonRef.current.focus() : '';
        console.log('SELECTED IN DMESSAGE: ', selected)
    })

    return (
        <>
            <Message>
                <WindowHeader className={styles.title}>
                    <div className={styles.top}> <span>Confirm {capitalized} Delete</span> </div>
                    <div className={styles.controlBtns}>
                        <button onClick={() => closeMessage()}> <span className={styles.close} /> </button>
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
                    <div className={styles.buttons}>
                        <button ref={closeButtonRef} onClick={Close} tabIndex={1}>Yes</button>
                        <button onClick={() => closeMessage()} tabIndex={2}>No</button>
                    </div>
                </WindowContent>
            </Message>
        </>
    )
}

export default DeleteMessage;
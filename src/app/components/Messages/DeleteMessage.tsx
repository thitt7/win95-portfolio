import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WindowContent, WindowHeader } from 'react95';
import Message from './Message';

import styles from '../../styles/window.module.scss';

type MessageProps = {
    task?: any,
    closeMessage: () => void,
    moveToRecycle: () => void
}

const DeleteMessage = ({task, closeMessage, moveToRecycle}: MessageProps) => {

    const {items, selected} = useSelector((state: any) => state.desktop);

    const dispatch = useDispatch();

    const closeButtonRef = useRef<any>();

    const capitalized = task.type.charAt(0).toUpperCase() + task.type.substring(1);
    let selectedItems = [];
    for (let [i, e] of selected.entries()) { if (e === true) {selectedItems.push(items[i])} }
    console.log('selected items: ', selectedItems)

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
                    {
                        selectedItems.length > 1 ? 
                        <div className={styles.top}> <span>Confirm Multiple File Delete</span></div> : 
                        <div className={styles.top}> <span>Confirm {capitalized} Delete</span> </div>
                    }
                    <div className={styles.controlBtns}>
                        <button onClick={() => closeMessage()}> <span className={styles.close} /> </button>
                    </div>
                </WindowHeader>
                <WindowContent className={styles.content}>
                    <div className={styles.contentContainer}>
                        {
                            selectedItems.length > 1 ? 
                            <>
                                <figure><img src={'/w95_54.ico'} /></figure>
                                <div className={styles.body}>
                                    {task.type == "file" ? <>Are you sure you want to send these {selectedItems.length} items to the Recycle Bin?</> : null}
                                </div>
                            </> : 
                            <>
                                <figure><img src={task.type == 'folder' ? '/w95_53.ico' : '/w95_52.ico'} /></figure>
                                <div className={styles.body}>
                                    {task.type == "file" ? <>Are you sure you want to send '{task.title}' to the Recycle Bin?</> : null}
                                    {task.type == "folder" ? <>Are you sure you want to remove the folder '{task.title}' and move all its contents to the Recycle Bin?</> : null}
                                </div>
                            </>
                        }
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
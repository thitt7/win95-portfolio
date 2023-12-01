import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import asyncDelay from '@/lib/asyncDelay';

import styles from '../styles/window.module.scss';

const Message = ({ children, type, title}: { children: React.ReactNode, type: string, title: string }) => {
    const messageRef = useRef<any>();
    const cRef = useRef<any>();
    const [open, setOpen] = useState(true);

    const style = {
        transform: 'translate(-50%, -50%);'
    }
    
    const closeMessage = () => {
        setOpen(false)
    }

    useLayoutEffect(() => {
        const message = messageRef.current;
        const fn = async () => {
            if (message) {
                // message.style.transform = 'translate(-50%, -50%)';
                // message.style.visibility = 'initial';
                cRef.current.focus();
            }
        }
        fn();
        
    }, [])
    

    return open ? (
        <>
                <Draggable handle={`[class*=title]`}>
                    <div ref={cRef} className={styles.container} tabIndex={0} style={style}>
                            <Window ref={messageRef} className={`${styles.window} ${styles.message}`}>
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
                                        <button onClick={closeMessage}>OK</button>
                                    </div>
                                </WindowContent>
                            </Window>
                    </div>
                </Draggable>
        </>
      ) : null;
}

export default Message
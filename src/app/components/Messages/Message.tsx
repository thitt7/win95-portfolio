import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import asyncDelay from '@/lib/asyncDelay';

import styles from '../../styles/window.module.scss';

const Message = ({ children, type, title}: { children?: React.ReactNode, type?: string, title?: string }) => {
    const messageRef = useRef<any>();
    const cRef = useRef<any>();
    const [open, setOpen] = useState(true);

    // const [focus, setFocus] = useState(cRef.current ? cRef.current.matches(':focus-within'): '')
    
    // const closeMessage = () => {
    //     setOpen(false)
    // }

    // useLayoutEffect(() => {
    //     const message = messageRef.current;
    //     const fn = async () => { if (message) { cRef.current.focus(); } }
    //     fn();

    //     setFocus(cRef.current ? cRef.current.matches(':focus-within'): '');
    //     const handleFocusChange = () => { setFocus(cRef.current ? cRef.current.matches(':focus-within'): ''); };
    //     document.addEventListener('focusin', handleFocusChange);
      
    //     return () => { document.removeEventListener('focusin', handleFocusChange); };
    // }, [])

    return open ? (
        <>
            <Draggable handle={`[class*=title]`}>
                <div ref={cRef} className={styles.container} tabIndex={0}>
                    <Window ref={messageRef} className={`${styles.message}`} id={styles['window']}>
                        {children}
                    </Window>
                </div>
            </Draggable>
        </>
      ) : null;
}

export default Message;
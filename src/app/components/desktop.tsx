'use client';

import TaskBar from './TaskBar';
import React, { useState, useRef, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import { AppBar } from 'react95';
import Programs from './Programs';
import Message from './Message';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { set, add, remove } from '../reducers/desktopSlice';
import startTask from '@/lib/startTask';

import styles from '../styles/desktop.module.scss';

export function Desktop() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    body: `Welcome to my portfolio! I'm Tristan, a full-stack developer who grew up in the early 2000s with Windows 95 - 2000 operating systems as my first foray into desktop computers.
      Have a look around the desktop, start menu, etc. it's just like you remember it. I've spared no expense and tried to make this the most true to life recreation of Windows 95 
      short of actually emulating it.`,
    type: "warn",
    title: "Warning"
  })

  const desktopRef = useRef<any>()

  const {items} = useSelector((state) => state.desktop);
  const dispatch = useDispatch();

useEffect(() => {
  console.log('ITEMS: ', items)
  if (desktopRef.current) {desktopRef.current.style.paddingBottom = `${document.querySelector('header')?.offsetHeight}px`}
})


  return (
    <div className={styles.container} ref={desktopRef}>
      <div className={styles.space}>
        {items.map((e: any) => {
          if (Object.keys(e).length) {
            return (
              <>
                <DesktopIcon task={e}/>
              </>
            )
          }
        })}
        
        <Programs />

        <Message type={message.type} title={message.title}>{message.body}</Message>
      </div>
      <TaskBar />
    </div>
  );
}
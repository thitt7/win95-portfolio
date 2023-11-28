'use client';

import TaskBar from './TaskBar';
import React, { useState, useRef, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import { AppBar } from 'react95';
import Programs from './Window';

import styles from '../styles/desktop.module.scss';

export function Desktop() {
  const [open, setOpen] = useState(false);

  const desktopRef = useRef<any>()

useEffect(() => {
  if (desktopRef.current) {desktopRef.current.style.paddingBottom = `${document.querySelector('header')?.offsetHeight}px`}
})


  return (
    <div className={styles.container} ref={desktopRef}>
      <div className={styles.space}>
        <DesktopIcon name={'neighborhood'} />
        <DesktopIcon id={styles['resume']} name={'resume'} />
        <Programs />
      </div>
      <TaskBar />
    </div>
  );
}
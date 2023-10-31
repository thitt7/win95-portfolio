'use client';

import TaskBar from './TaskBar';
import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import { AppBar } from 'react95';
import Programs from './Window';

import styles from '../styles/desktop.module.scss';

export function Desktop() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.space}>
        <DesktopIcon name={'neighborhood'}/>
        <Programs />
      </div>
        <TaskBar />
        </div>
  );
}
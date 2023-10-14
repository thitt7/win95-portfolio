'use client';

import TaskBar from './TaskBar';
import React, { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import { AppBar } from 'react95';

import styles from '../styles/desktop.module.scss';

// type Program = {
//   title: string,
//   icon: string,
//   open: boolean,

// }

// const neighborhood: Program = {
//   title: 'Network<br/>Neighborhood',
//   icon: 'w95_18',
//   open: false,
// }

export function Desktop() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.space}>
        <DesktopIcon name={'neighborhood'}/>
      </div>
        <TaskBar />
        </div>
  );
}
'use client';

import React, {useState, useEffect, useRef} from 'react';
import { Separator } from 'react95';
import Popover from '@mui/material/Popover';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import startTask from '@/lib/startTask';
import * as desktop from '../../reducers/desktopSlice';
import * as recycleBin from '../../reducers/recycleSlice';
import ContextPopover from './Popover';
import DeleteMessage from '../Messages/DeleteMessage';

import styles from '@styles/popover.module.scss';
import desktopStyles from '@styles/desktop.module.scss';

type popoverProps = {
    children?: React.ReactNode,
    coords: {x: number, y: number},
    open: boolean,
    task: any,
    close: () => void
}

const IconPopover = ({coords, open, task, close}: popoverProps) => {

    const {items, selected} = useSelector((state: any) => state.desktop);

    const [message, setMessage] = useState(false);

    const dispatch = useDispatch();

    const Open = () => {
        close();
        startTask(task);
    }
      
    const Delete = () => {
        close();
        setMessage(true)
        // dispatch(remove(task));
    }

    const closeMessage = () => setMessage(false)

    const moveToRecycle = () => {

        let desktopItems: any = []
        let indexes: number[] = [];

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                indexes.push(i);
                desktopItems.push(items[i])
            }
        }

        dispatch(desktop.remove(indexes));
        dispatch(recycleBin.add(desktopItems));
    }

    // useEffect(() => {
    //   console.log("INIT VAL: ", selectedRef.current)
    // })
    
  
  return (
    <>
    <ContextPopover coords={coords} open={open} task={task} close={close}>
        <strong><li onClick={Open}>Open</li></strong>
        <li data-disabled>Explore</li>
        <li data-disabled>Find...</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Format...</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Send To</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Cut</li>
        <li data-disabled>Copy</li>
        <Separator className={styles.divider}/>
        <li>Add to Start</li>
        <li data-disabled>Create Shortcut</li>
        <li onClick={Delete}>Delete</li>
        <li>Rename</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Properties</li>
    </ContextPopover>

    {
        message ? <DeleteMessage task={task} closeMessage={closeMessage} moveToRecycle={moveToRecycle}/> : null
    }
    </>
  )
}

export default IconPopover;
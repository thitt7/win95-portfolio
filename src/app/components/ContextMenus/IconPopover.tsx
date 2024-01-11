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
    selected: [],
    close: () => void
}

const IconPopover = ({coords, open, task, close}: popoverProps) => {

    const {selected} = useSelector((state: any) => state.desktop);

    const [message, setMessage] = useState(false);

    const dispatch = useDispatch();

    // let initialSelected, selectedEx, selectedRef;
    // if (typeof document !== 'undefined' && !selected.length) {
    //     selectedEx = [...document.querySelectorAll(`.${desktopStyles.icon}:not([data-disabled])`)].map((e)=>{return e?.classList?.contains(desktopStyles.selected)});
    //     // selectedRef = useRef([...document.querySelectorAll(`.${desktopStyles.icon}:not([data-disabled])`)].map((e)=>{return e?.classList?.contains(desktopStyles.selected)}));
    //     initialSelected = [...document.querySelectorAll(`.${desktopStyles.icon}:not([data-disabled])`)].map((e) => { return e?.classList?.contains(desktopStyles.selected) });
    //     console.log('INITIALSELECTED: ', initialSelected)
    //     dispatch(desktop.setSelected(initialSelected))
    //     // selectedRef = useRef(initialSelected);
    //     selectedRef = useRef([...document.querySelectorAll(`.${desktopStyles.icon}:not([data-disabled])`)].map((e) => { return e?.classList?.contains(desktopStyles.selected) }));
    //     console.log('SELECTED REF: ', selectedRef.current)
    // }
    
    // console.log('SEL: ', selectedEx)

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
        // console.log('SELECTED: ', selected)
        dispatch(desktop.remove(task));
        dispatch(recycleBin.add(task));
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
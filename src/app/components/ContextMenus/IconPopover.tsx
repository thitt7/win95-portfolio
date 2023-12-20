import React, {useState, useEffect} from 'react';
import { Separator } from 'react95';
import Popover from '@mui/material/Popover';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import startTask from '@/lib/startTask';
import * as desktop from '../../reducers/desktopSlice';
import * as recycleBin from '../../reducers/recycleSlice';
import ContextPopover from './Popover';
import DeleteMessage from '../Messages/DeleteMessage';

import styles from '../../styles/popover.module.scss';

type popoverProps = {
    children?: React.ReactNode,
    coords: {x: number, y: number},
    open: boolean,
    task: any,
    close: () => void
}

const IconPopover = ({coords, open, task, close}: popoverProps) => {

    const [message, setMessage] = useState(false)

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
        dispatch(desktop.remove(task));
        dispatch(recycleBin.add(task));
    }

    useEffect(() => {
    //   console.log("MESSAGE STATE: ", message)
    })
    
  
  return (
    <>
    <ContextPopover coords={coords} open={open} task={task} close={close}>
        <strong><li onClick={Open}>Open</li></strong>
        <li>Explore</li>
        <li>Find...</li>
        <Separator className={styles.divider}/>
        <li>Format...</li>
        <Separator className={styles.divider}/>
        <li>Send To</li>
        <Separator className={styles.divider}/>
        <li>Cut</li>
        <li>Copy</li>
        <Separator className={styles.divider}/>
        <li>Add to Start</li>
        <li>Create Shortcut</li>
        <li onClick={Delete}>Delete</li>
        <li>Rename</li>
        <Separator className={styles.divider}/>
        <li>Properties</li>
    </ContextPopover>

    {
        message ? <DeleteMessage task={task} closeMessage={closeMessage} moveToRecycle={moveToRecycle}/> : null
    }
    </>
  )
}

export default IconPopover;
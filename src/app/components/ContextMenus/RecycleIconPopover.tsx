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

const recycleIconPopover = ({coords, open, task, close}: popoverProps) => {

    const {tasks} = useSelector((state: any) => state.program);
    const {binItems} = useSelector((state: any) => state.recycle);

    const recycle  = tasks.find((obj: any) => obj.name == 'recycle')

    const [message, setMessage] = useState(false)

    const dispatch = useDispatch();

    const Open = () => {
        close();
        !recycle ? startTask(task) : false;
    }
      
    const Empty = () => {
        close();
        // setMessage(true)
        dispatch(recycleBin.empty());
    }

    const closeMessage = () => setMessage(false)

    const moveToRecycle = () => {
        dispatch(desktop.remove(task));
        dispatch(recycleBin.add(task));
    }
  
  return (
    <>
    <ContextPopover coords={coords} open={open} task={task} close={close}>
        <li onClick={Open}><strong>Open</strong></li>
        <li data-disabled>Explore</li>
        <li onClick={Empty}>Empty Recycle Bin</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Create Shortcut</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Properties</li>
    </ContextPopover>

    {
        message ? <DeleteMessage task={task} closeMessage={closeMessage} moveToRecycle={moveToRecycle}/> : null
    }
    </>
  )
}

export default recycleIconPopover;
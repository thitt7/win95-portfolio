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
    selected: boolean[],
    close: () => void
}

const recycleBinPopover = ({coords, open, task, selected, close}: popoverProps) => {

    const {binItems} = useSelector((state: any) => state.recycle);

    const [message, setMessage] = useState(false)

    const dispatch = useDispatch();

    const Restore = () => {
        close();
        
        let items: any = []
        let indexes: number[] = [];

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                indexes.push(i);
                items.push(binItems[i])
            }
        }

        dispatch(recycleBin.remove(indexes))
        dispatch(desktop.set(items))
    }
      
    const Delete = () => {
        close();
        let indexes: number[] = [];

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                indexes.push(i);
            }
        }

        dispatch(recycleBin.remove(indexes))
    }
  
  return (
    <>
    <ContextPopover coords={coords} open={open} task={task} close={close}>
        <li onClick={Restore}>Restore</li>
        <Separator className={styles.divider}/>
        <li>Cut</li>
        <Separator className={styles.divider}/>
        <li onClick={Delete}>Delete</li>
        <Separator className={styles.divider}/>
        <li data-disabled>Properties</li>
    </ContextPopover>
    </>
  )
}

export default recycleBinPopover;
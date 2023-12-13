import React, {useState, useEffect} from 'react';
import { Separator } from 'react95';
import Popover from '@mui/material/Popover';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import startTask from '@/lib/startTask';
import { set, add, remove } from '../reducers/desktopSlice';

import styles from '../styles/popover.module.scss';

type popoverProps = {
    coords: {x: number, y: number},
    open: boolean,
    type: string,
    task: any,
    close: () => void
}

const ContextPopover = ({ coords, open, type, task, close }: popoverProps) => {

  // const {items} = useSelector((state) => state.desktop);
  const dispatch = useDispatch();

    const blurHandler = (e: any) => { close() }

    // useEffect(() => {
    //     console.log('OPEN PROP: ', open)
    //     console.log('OPENSTATE: ', openState)
    //   })

    const Open = () => {
      close();
      startTask(task);
    }
    
    const Delete = () => {
      close();
      dispatch(remove(task));
    }

    const variant: any = {
      icon: <>
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
      </>
    }

  return (
      <Popover
        id={styles['popover']}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ left: coords!.x, top: coords!.y }}
        anchorOrigin={{ vertical: 'center', horizontal: 'right', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        TransitionComponent={undefined}
        onClose={blurHandler}
      >
        {variant[type]}
      </Popover>
  )
}

export default ContextPopover;
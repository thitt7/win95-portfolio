import React, {useState, useEffect} from 'react';
import { Separator } from 'react95';
import Popover from '@mui/material/Popover';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import startTask from '@/lib/startTask';
import { set, add, remove } from '../../reducers/desktopSlice';

import styles from '../../styles/popover.module.scss';

type popoverProps = {
    children?: React.ReactNode,
    coords: {x: number, y: number},
    open: boolean,
    task: any,
    close: () => void
}

const ContextPopover = ({ children, coords, open, task, close }: popoverProps) => {

  // const {items} = useSelector((state) => state.desktop);
  const dispatch = useDispatch();

    const blurHandler = (e: any) => { close() }

    // useEffect(() => {
    //     console.log('OPEN PROP: ', open)
    //     console.log('OPENSTATE: ', openState)
    //   })

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
        {children}
      </Popover>
  )
}

export default ContextPopover;
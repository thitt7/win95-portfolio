'use client';

import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import startTask from '@/lib/startTask.tsx';
import * as desktop from '../../reducers/desktopSlice';
import IconPopover from '../ContextMenus/IconPopover';

import styles from '@styles/desktop.module.scss';

type GenericDragEvent<T = HTMLElement> = React.DragEvent<T>

type Program = {
    task: any,
    iconRef: any,
    onClick: any,
    onMouseDown: any,
    selectIcon: any
}

const DesktopIcon = ({task, iconRef, onClick, onMouseDown, selectIcon}: Program) => {

    // const iconRef = useRef<HTMLAnchorElement>()

    // iconRef.current!.addEventListener("touchend", (e: any) => startTask(e));

    // const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`]);
    const [popover, setPopover] = useState(false);
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0})

    const tasks = useSelector((state: any) => state.program.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        //   iconRef.current ? iconRef.current!.addEventListener("touchend", (e: any) => startTask(e)) : '';
        const icon = iconRef?.current;
        // const icon = iconRef.current;
        if (task.name == 'recycle' && icon) {
            icon.addEventListener('dragenter', dragEnterHandler);
            icon.addEventListener('dragover', dragOverHandler);
            icon.addEventListener('drop', dropHandler);
        }

        return () => {
            icon?.removeEventListener('dragenter', dragEnterHandler);
            icon?.removeEventListener('dragover', dragOverHandler);
            icon?.removeEventListener('drop', dropHandler);
        };
    })

    const secondaryclickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        selectIcon();
        setCoords({x: e.clientX, y: e.clientY});
        setPopover(true);
        // dispatch(desktop.setSelected([...document.querySelectorAll(`.${styles.icon}:not([data-disabled])`)].map((e) => { return e?.classList?.contains(styles.selected) })));
    }

    const dragStartHandler = (e: React.DragEvent) => {
        // e.preventDefault();
        e.dataTransfer.setData('text/plain', JSON.stringify(task))
        console.log('dragging')
    }

    const dragEnterHandler = (e: Event) => { e.preventDefault(); }

    const dragOverHandler = (e: Event) => { e.preventDefault(); }

    const dropHandler = (e: any) => {
        e.preventDefault();
        console.log('DROPEVENT: ', e);
        const eventData = e.dataTransfer.getData('text/plain')
        console.log('EVENT TRANSFER: ', eventData)
    }

    const close = () => {setPopover(false)}
    

  return (
      <>
          <Link ref={iconRef} href="#" className={styles.icon} onDoubleClick={() => startTask(task)} onDragStart={dragStartHandler} onContextMenu={secondaryclickHandler} onClick={onClick} onMouseDown={onMouseDown}>
              <img className={styles.img} src={`/${task.icon}`} alt="" />
              <div className={styles.border}>
                  <p className={styles.text} dangerouslySetInnerHTML={{ __html: task.title }}></p>
              </div>
          </Link>
          <IconPopover coords={coords} open={popover} task={task} close={close}></IconPopover>
      </>
  )
}

export default DesktopIcon;
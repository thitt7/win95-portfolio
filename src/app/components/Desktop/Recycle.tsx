import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import startTask from '@/lib/startTask.tsx';
import RecycleIconPopover from '../ContextMenus/RecycleIconPopover';
import RecycleBinPopover from '../ContextMenus/RecycleBinPopover';
import ProgramWindow from '../Window';
import * as desktop from '../../reducers/desktopSlice';
import * as recycleBin from '../../reducers/recycleSlice';
import asyncDelay from '@/lib/asyncDelay';

import styles from '@styles/desktop.module.scss';
import windowStyles from '@styles/window.module.scss';

type GenericDragEvent<T = HTMLElement> = React.DragEvent<T>;

type Program = {
    title: string,
    icon: string,
    open: boolean,

}

const recycle = {
    title: "Recycle Bin",
    name: "recycle",
    body:"",
    toolbar: "<a href=''><button>File</button></a><a href=''><button>Edit</button></a><a href=''><button>View</button></a><a href=''><button>Help</button></a>",
    icon: "w95_32.ico",
    iconFull: "w95_33.ico",
    type: "folder",
    filename: "recyclebin.exe",
    permissions: "r",
    contents: []
}

const RecycleIcon = ({reset} : {reset: any}) => {

    const iconRef = useRef<HTMLAnchorElement>()

    const {tasks} = useSelector((state: any) => state.program);
    const {items, selected} = useSelector((state: any) => state.desktop);
    const {binItems} = useSelector((state: any) => state.recycle);
    
    const [popover, setPopover] = useState(false);
    const [binPopover, setBinPopover] = useState(false);
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0});
    const itemsArr = useRef<any>({selected: Array(binItems.length).fill(false)});

    const dispatch = useDispatch();

    const task = tasks.find((obj: any) => obj.name == 'recycle');

    const moveToRecycle = () => {

        let desktopItems: any = [];
        let indexes: number[] = [];
        console.log(selected)

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                indexes.push(i);
                desktopItems.push(items[i])
            }
        }

        dispatch(desktop.remove(indexes));
        dispatch(recycleBin.add(desktopItems));
        reset();
    }

    useEffect(() => {

        const icon = iconRef.current;
        if (icon) {
            icon.addEventListener('dragenter', dragEnterHandler);
            icon.addEventListener('dragover', dragOverHandler);
            icon.addEventListener('drop', dropHandler);
        }

        return () => {
            icon.removeEventListener('dragenter', dragEnterHandler);
            icon.removeEventListener('dragover', dragOverHandler);
            icon.removeEventListener('drop', dropHandler);
        };
    })

    const Start = () => {
        !task ? startTask(recycle) : false;
    }

    const iconHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setCoords({x: e.clientX, y: e.clientY})
        setPopover(true);
    }

    const binHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setCoords({x: e.clientX, y: e.clientY})
        setBinPopover(true);
    }

    const dragEnterHandler = (e: Event) => { e.preventDefault(); }

    const dragOverHandler = (e: Event) => { e.preventDefault(); }

    const dropHandler = (e: any) => {
        e.preventDefault();
        // const eventData = e.dataTransfer.getData('text/plain');
        // const dropTask = JSON.parse(eventData);
        // dispatch(desktop.remove(dropTask));
        // dispatch(recycleBin.add(dropTask));
        moveToRecycle();
    }

    const close = () => {
        setPopover(false);
        setBinPopover(false);
    }


    const selectItem = (e: React.MouseEvent, i: number) => { 
      
        itemsArr.current.selected[i] = true;
        itemsArr[i].classList.add(windowStyles.selected);
        
        if (e.ctrlKey) {}

        else if (e.shiftKey) {
            let n = itemsArr.current.selected.length;
            let first = -1, last = -1;

            for (let i = 0; i < n; i++) {
                if (!itemsArr.current.selected[i])
                    continue;
                if (first == -1){first = i}
                last = i;
            }
            
            for (let i = first; i <= last; i++) {
                itemsArr[i]?.classList.add(windowStyles.selected);
                itemsArr.current.selected[i] = true;
            }
        }

        else {
            if (itemsArr.current.selected.some(val => val === true)) {
                for (const prop in itemsArr) {
                    if (prop == String(i)) {
                        itemsArr[prop]?.classList.add(windowStyles.selected);
                        itemsArr.current.selected[prop] = true;
                    }
                    else {
                        itemsArr[prop]?.classList ? itemsArr[prop]?.classList.remove(windowStyles.selected) : ''
                        itemsArr.current.selected[prop] = false;
                    }
                  }
            }
            else {
                itemsArr[i].classList.add(windowStyles.selected);
                itemsArr.current.selected[i] = true;
            }
        }
    }

    const setItemRef = (e: Element, i: number) => {
        itemsArr[i] = e;
    }

    useEffect(() => {
    //   console.log('ITEMS ARR: ', itemsArr)
      itemsArr.current.selected = Array(binItems.length).fill(false)
    
        const handleClick = (event) => {
            // console.log('recycle click handler', event);
            // const anySelected = itemsArr.current.selected.some(val => val === true);
            const anySelected = Object.values(itemsArr).some(e => {return e?.classList?.contains(windowStyles.selected)})
            const isNotWindowItem = !event.target.closest(`.${windowStyles.item}`) && !event.target.classList.contains(windowStyles.item)

            if (binItems.length && anySelected && isNotWindowItem) {
                for (const prop in itemsArr) {
                    itemsArr.current.selected[prop] = false;
                    itemsArr[prop]?.classList ? itemsArr[prop]?.classList.remove(windowStyles.selected) : ''
                }
            }
            
        }

        /* If recycle bin window is open and contains any items, then bind event handler */
        if (task && binItems.length) {document.onmousedown = handleClick;}

        // return () => { document.removeEventListener('click', handleClick); };
        return () => { document.removeEventListener('onmousedown', handleClick); };
    })
    
    

  return (
      <>
          <Link data-disabled ref={iconRef} href="javascript:void(0)" className={styles.icon} onDoubleClick={Start} onContextMenu={iconHandler}>
              <img className={styles.img} src={binItems.length ? `/${recycle.iconFull}` : `/${recycle.icon}`} alt="" />
              <div className={styles.border}>
                  <p className={styles.text} >{recycle.title}</p>
              </div>
          </Link>
          <RecycleIconPopover coords={coords} open={popover} task={recycle} close={close}></RecycleIconPopover>

          {(task) ? 
            <ProgramWindow task={task}>
                  <div className={windowStyles.recycle}>
                      {binItems?.map((item, i: number) => {
                          return (
                            <>

                            <div ref={(e) => setItemRef(e, i)} className={windowStyles.item} tabIndex={i+1} onClick={(e) => selectItem(e, i)} onContextMenu={binHandler}>
                                <figure><img src={item.icon} alt={`${item.title} icon`} /></figure>
                                <div className={windowStyles.text}>{item.filename}</div>
                            </div>

                            <RecycleBinPopover coords={coords} open={binPopover} task={task} selected={itemsArr.current.selected} close={close}></RecycleBinPopover>

                            </>
                          )
                      })}

                  </div>
            </ProgramWindow> : null}
      </>

  )
}

export default RecycleIcon;
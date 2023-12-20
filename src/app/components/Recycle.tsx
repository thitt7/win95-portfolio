import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import programs from '../../../public/programs.json';
import startTask from '@/lib/startTask.tsx';
import IconPopover from './ContextMenus/IconPopover';
import ProgramWindow from './Window';
import * as recycleBin from '../reducers/recycleSlice';

import styles from '../styles/desktop.module.scss';
import windowStyles from '../styles/window.module.scss';

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
    iconFull: "w95_33",
    type: "folder",
    filename: "recyclebin.exe",
    permissions: "r",
    contents: []
}

const RecycleIcon = () => {

    const iconRef = useRef<HTMLAnchorElement>()

    // iconRef.current!.addEventListener("touchend", (e: any) => startTask(e));

    const {tasks} = useSelector((state: any) => state.program);
    const {binItems} = useSelector((state: any) => state.recycle);
    
    const [popover, setPopover] = useState(false);
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [selected, setSelected] = useState<Array<Boolean>>(Array(binItems.length).fill(false));
    const [ex, setEx] = useState(false);
    const selectArr = selected?.map((e) => {e ? 'selected' : ''})
    const condition = true;

    const dispatch = useDispatch();

    const task = tasks.find((obj: any) => obj.name == 'recycle')

    useEffect(() => {
        console.log('selected state: ', selected)
        //   iconRef.current ? iconRef.current!.addEventListener("touchend", (e: any) => startTask(e)) : '';

        // console.log('TASKS: ', tasks)
        // console.log('WINDOW REF: ', task?.windowRef)
        // let foundObject = tasks.find((obj: any) => obj.name == 'recycle');
        // if (foundObject) {console.log('true')}
        // else {console.log('false')}

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

    const secondaryclickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setCoords({x: e.clientX, y: e.clientY})
        setPopover(true);
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

    const selectItem = (i: number) => { 
        // if (!selected[i]) {
        //     setSelected((selected) => {
        //         let copy = [...selected];
        //         copy[i] = true;
        //         return copy;
        //     })
        // }
        setSelected((selected) => {
            let copy = [...selected];
            copy[i] = true;
            return copy;
        })
    }

    const deselectItem = (i: number) => {
        console.log('blurring...')
        setSelected((selected) => {
            let copy = [...selected];
            copy[i] = false;
            return copy;
        })
    }

    useEffect(() => {
      console.log('selected changed...', selected)
    }, [selected, ex])
    
    

  return (
      <>
          <Link ref={iconRef} href="javascript:void(0)" className={styles.icon} onDoubleClick={() => startTask(recycle)} onContextMenu={secondaryclickHandler}>
              <img className={styles.img} src={condition ? `/${recycle.icon}` : `/${recycle.iconFull}`} alt="" />
              <div className={styles.border}>
                  <p className={styles.text} >{recycle.title}</p>
              </div>
          </Link>
          <IconPopover coords={coords} open={popover} task={task} close={close}></IconPopover>

          {/* {return (<ProgramWindow task={recycle}></ProgramWindow>)} */}
          {(task) ? 
            <ProgramWindow task={task}>
                  <div className={windowStyles.recycle}>
                      {/* {binItems?.map((item, i: number) => {
                          return (
                            <>
                            <div className={`${windowStyles.item} ${selected[i]?'selected':''}`} tabIndex={i} onClick={()=>selectItem(i)} onBlur={()=>deselectItem(i)}>
                                <figure><img src={item.icon} alt={`${item.title} icon`} /></figure>
                                <div className={windowStyles.text}>{item.filename}</div>  
                            </div>

                            </>
                          )
                      })} */}
                        <select multiple className={windowStyles.select}>
                            {binItems?.map((item, i: number) => {
                                return (
                                    <>
                                        {/* <option value="American">{item.filename}</option> */}
                                        <option className={`${windowStyles.item} ${selected[i] ? 'selected' : ''}`} tabIndex={i}>
                                            <figure><img src={item.icon} alt={`${item.title} icon`} /></figure>
                                            <div className={windowStyles.text}>{item.filename}</div>
                                        </option>
                                    </>
                                )
                            })}
                        </select>
                  </div>
            </ProgramWindow> : null}
      </>

    // <div>
    //     {
    //         true ? (<p></p>) : <></>
    //     }
    // </div>
  )
}

export default RecycleIcon;
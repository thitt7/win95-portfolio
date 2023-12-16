import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import programs from '../../../public/programs.json';
import startTask from '@/lib/startTask.tsx';
import IconPopover from './ContextMenus/IconPopover';
import ProgramWindow from './Window';

import styles from '../styles/desktop.module.scss';

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
    toolbar: "",
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

    // const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`]);
    const [popover, setPopover] = useState(false);
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0});
    const condition = true;

    const {tasks} = useSelector((state) => state.program);
    const dispatch = useDispatch();

    const task = tasks.find((obj: any) => obj.name == 'recycle')

    useEffect(() => {
        //   iconRef.current ? iconRef.current!.addEventListener("touchend", (e: any) => startTask(e)) : '';
        console.log('TASKS: ', tasks)
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
          {(task) ? <ProgramWindow task={task}></ProgramWindow> : null}
      </>

    // <div>
    //     {
    //         true ? (<p></p>) : <></>
    //     }
    // </div>
  )
}

export default RecycleIcon;
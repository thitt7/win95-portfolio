import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import programs from '../../../public/programs.json';
import startTask from '@/lib/startTask.tsx';
import IconPopover from './ContextMenus/IconPopover';
import ContextPopover from './ContextMenus/Popover';

import styles from '../styles/desktop.module.scss';

type Program = {
    title: string,
    icon: string,
    open: boolean,

}

const DesktopIcon = ({task}: {task: any}) => {

    const iconRef = useRef<HTMLAnchorElement>({})

    // iconRef.current!.addEventListener("touchend", (e: any) => startTask(e));

    // const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`]);
    const [popover, setPopover] = useState(false);
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0})

    const tasks = useSelector((state) => state.program.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
    //   iconRef.current ? iconRef.current!.addEventListener("touchend", (e: any) => startTask(e)) : ''
    })

    const secondaryclickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setCoords({x: e.clientX, y: e.clientY})
        setPopover(true);
    }

    const close = () => {setPopover(false)}
    

  return (
      <>
          <Link ref={iconRef} href="javascript:void(0)" className={styles.icon} onDoubleClick={() => startTask(task)} onContextMenu={secondaryclickHandler}>
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
import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../reducers/programSlice';
import Link from 'next/link';
import programs from '../../../public/programs.json'

import styles from '../styles/desktop.module.scss';

type Program = {
    title: string,
    icon: string,
    open: boolean,

}

const DesktopIcon = ({name}: {name?: string}) => {

    const iconRef = useRef<Element>()

    // iconRef.current!.addEventListener("touchend", (e: any) => startTask(e));

    const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`])
    const tasks = useSelector((state) => state.program.tasks)
    const dispatch = useDispatch()

    const startTask = (e: React.MouseEvent) => {
        // setProgram((program) => {return {...program, running: true, windowed: true}})
        dispatch(set({...program, running: true, windowed: true, uuid: uuidv4()}))
    }

    useEffect(() => {
    //   iconRef.current ? iconRef.current!.addEventListener("touchend", (e: any) => startTask(e)) : ''
    })
    

  return (
      <>
          <Link ref={iconRef} href="javascript:void(0)" className={styles.icon} onDoubleClick={startTask}>
              <img className={styles.img} src={`/${program.icon}.ico`} alt="" />
              <div className={styles.border}>
                  <p className={styles.text} dangerouslySetInnerHTML={{ __html: program.formattedTitle }}></p>
              </div>
          </Link>
      </>
  )
}

export default DesktopIcon
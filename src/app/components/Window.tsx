import React, {useState, useRef, useEffect, useCallback} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import { set, close } from '../reducers/programSlice';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import Resizable from './Resizable';

import styles from '../styles/window.module.scss';

const Programs = () => {

  const dispatch = useDispatch()
  const tasks = useSelector((state: any) => state.program.tasks)
  console.log('tasks: ',tasks)

  const ref = React.useCallback((node: any) => {
    node?.focus()
  }, [])

  return (
    <>
      {
        tasks.map((e: any, i: number) => {

          const closeProgram = () => {
            // dispatch(close(e.uuid))
          }

          if (Object.keys(e).length){
            return (
              <>
                <Draggable key={e.uuid} onDrag={(e) => { console.log('drag event: ', e) }} handle="[class*=title]">
                  <div ref={ref} className={styles.container} tabIndex={i}>
                    <Resizable>
                      <Window className={styles.window} >
                        <WindowHeader className={styles.title}>
                          <div className={styles.top}>
                            <figure><img src={`/${e.icon}.ico`} alt="" /></figure>
                            <span>{e.title}</span>
                          </div>
                          <div className={styles.controlBtns}>
                            <div>
                              <button className={styles.min}><span/></button>
                              <button className={styles.max}><span/></button>
                            </div>
                            <button onClick={closeProgram}> <span className={styles.close} /> </button>
                          </div>
                        </WindowHeader>
                        <Toolbar>
                          <Button variant='menu' size='sm'>
                            File
                          </Button>
                          <Button variant='menu' size='sm'>
                            Edit
                          </Button>
                          <Button variant='menu' size='sm' disabled>
                            Save
                          </Button>
                        </Toolbar>
                        <WindowContent>
                          <article dangerouslySetInnerHTML={{ __html: e.body }}></article>
                          <p>UUID: {e.uuid}</p>
                        </WindowContent>
                      </Window>
                    </Resizable>
                  </div>
                </Draggable>
              </>
            )
          }
        })
      }
    </>
  )
}

export default Programs;
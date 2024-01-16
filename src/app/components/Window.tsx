'use client';

import React, {useState, useRef, useEffect, useCallback, cloneElement} from 'react';
import { Frame, Window, WindowContent, WindowHeader } from 'react95';
import { close, setMin, setMax, setWindowRef, setCopyRef, focus } from '../reducers/programSlice';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Draggable from 'react-draggable';
import Toolbar from './Toolbar';
import Resizable from './Resizable';
import asyncDelay from '@/lib/asyncDelay';

import styles from '../styles/window.module.scss';

const ProgramWindow = ({ children, task, i }: { children?: React.ReactNode, task: any, i?: number }) => {

    const dispatch = useDispatch()
    const {tasks} = useSelector((state: any) => state.program, shallowEqual)
    const [maxState, setMaxState] = useState({})
    const [clone, setClone] = useState<HTMLElement>();

    const ref = useRef<any>({});
    const maxRef = useRef<any>();
    const minRef = useRef<any>();
    const copyRef = useRef<any>({});
    const topRef = useRef<any>({});

    const setRef = async (el: any) => {
        if (el && !ref.current[task.uuid]) {
          el.style.width = `${window.innerWidth / 3}px`;
          ref.current[task.uuid] = el;
          const windowRef = (tasks.find((obj: any) => obj.uuid === task.uuid)).windowRef;
          if (!windowRef) {dispatch(setWindowRef({uuid: task.uuid, ref: el}))}
        } 
        else { delete ref.current[task.uuid] }

        await asyncDelay(1)
        el?.focus()

      }

      // const setCopy = (el: any) => {
      //   try {
      //     if (Object.keys(el).some(key => key.startsWith('__reactFiber'))) {
      //       consoltask.log('EL IN SETCOPY: ', el);
      //       console.log(Object.keys(el));
      //       if (!copyRef.current[e.uuid]) {
      //       console.log('running this')
      //       dispatch(setCopyRef({uuid: e.uuid, ref: el}))
      //     }
      //     }
      //   } catch (error) {}
        
      //   if (el && copyRef.current) {
      //     console.log('running that')
      //     copyRef.current[e.uuid] = {ref: el}
      //   }
      //   if (el && copyRef.current) {
      //     // const copy = (tasks.find((obj: any) => obj.uuid === e.uuid)).copyRef;
      //     // if (!copy) {dispatch(setCopyRef({uuid: e.uuid, ref: el}))}
      //   }
        
      // }

      const setCopy = (el: any) => {   
        if (el && copyRef.current) { copyRef.current[task.uuid] = {ref: el} }
      }

      const setTopRef = (el: any) => {   
        if (el && topRef.current) { topRef.current[task.uuid] = {ref: el} }
        if (topRef.current) {
          if (!clone) {setClone(topRef.current[task.uuid].ref.cloneNode(true))}
        }
      }

      const focusHandler = async () => {
        const taskRef = (tasks.find((obj: any) => obj.uuid === task.uuid)).taskRef;
        const focused = taskRef?.getAttribute("data-active");

        focused === 'false' ? taskRef?.setAttribute("data-active", true) : taskRef?.setAttribute("data-active", false);
      }

      const Copy = () => {
        if (clone) {
          return <div ref={setCopy} id={styles['copy']} dangerouslySetInnerHTML={{ __html: clone!.outerHTML}} data-uuid={task.uuid}/>
        }
        else return null
      }

      const matchPosition = async () => {
        const copy = copyRef.current[task.uuid].ref;
        const top = topRef.current[task.uuid].ref;

        const rect = top.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        const width = top.offsetWidth;
        const height = top.offsetHeight;
        
        if (maxRef[`${task.uuid}`]) {
          ref.current[task.uuid].coords = {x: x, y: y, width: width, height: height};

          copy.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
          copy.style.width = `${width - 4}px`;
          copy.style.height = `${height - 4}px`;
          copy.style.zIndex = `2`;
        }
        else {
          const {x, y, width, height} = ref.current[task.uuid].coords;

          copy.style.zIndex = `2`;
          copy.style.width = `100%`;
          copy.style.transform = `translate(0)`;
          await asyncDelay(20);
          copy.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
          copy.style.width = `${width - 4}px`;
          copy.style.height = `${height - 4}px`;
          await asyncDelay(230);
          copy.style.zIndex = '';
          copy.style.display = '';
        }
    
      }

      const closeProgram = () => {
        dispatch(close(task.uuid))
        delete ref.current[task.uuid];
        delete copyRef.current[task.uuid].ref
      }

      const Minimize = async () => {
        let taskRef = (tasks.find((obj: any) => obj.uuid === task.uuid)).taskRef;
        const copy = copyRef.current[task.uuid].ref;
        const top = topRef.current[task.uuid].ref;

        const topX = top.getBoundingClientRect().left + window.scrollX;
        const topY = top.getBoundingClientRect().top + window.scrollY;
        const topWidth = top.offsetWidth;
        const topHeight = top.offsetHeight;

        const taskX = taskRef.getBoundingClientRect().left + window.scrollX;
        const taskY = taskRef.getBoundingClientRect().top + window.scrollY;
        const taskWidth = taskRef.offsetWidth;
        const taskHeight = taskRef.offsetHeight;

        // if (!minRef || (minRef && !minRef[e.uuid])) {minRef[e.uuid] = true}
        // else {minRef[e.uuid] = false}

        if (minRef) {
          copy.style.transform = `translate(${topX + 2}px, ${topY + 2}px)`;
          copy.style.width = `${topWidth - 4}px`;
          copy.style.height = `${topHeight - 4}px`;
          copy.style.zIndex = `2`;

          copy.style.display = 'block';
          await asyncDelay(1)

          copy.style.transform = `translate(${taskX + 2}px, ${taskY + 2}px)`;
          copy.style.width = `${taskWidth - 4}px`;
          copy.style.height = `${taskHeight - 4}px`;
          await asyncDelay(230);
          copy.style.zIndex = ``;
          ref.current[task.uuid].style.visibility = 'hidden';
        }

        const min = (tasks.find((obj: any) => obj.uuid === task.uuid)).min;
        dispatch(setMin({uuid: task.uuid, min: !min}));

      }

      const Maximize = async () => {
        const copy = copyRef.current[task.uuid].ref;
        const top = topRef.current[task.uuid].ref;

        if (!maxRef || (maxRef && !maxRef[task.uuid])) {maxRef[task.uuid] = true}
        else {maxRef[task.uuid] = false}

        const max = (tasks.find((obj: any) => obj.uuid === task.uuid)).max;
        dispatch(setMax({uuid: task.uuid, max: !max}));
        setMaxState((maxState)=>{return {...maxState, [task.uuid]: !maxState[task.uuid]}});

        if (topRef.current && copyRef.current[task.uuid].ref) {

          await asyncDelay(1);
          matchPosition()
          await asyncDelay(1);
          copyRef.current[task.uuid].ref.style.display = 'block';
          await asyncDelay(1);

          if (maxRef[task.uuid]) {
            copyRef.current[task.uuid].ref.style.width = `100%`;
            copyRef.current[task.uuid].ref.style.transform = `translate(0)`;
            // await asyncDelay(500);
            copyRef.current[task.uuid].ref.style.zIndex = ``;
          }
          else {
            matchPosition()
          }

        }

        await asyncDelay(250);
        ref.current[task.uuid].classList.toggle(styles.max);
        
      }

      if (Object.keys(task).length){
        return (
          <>
            <Copy />
            <Draggable key={task.uuid} handle={`[class*=title]`} disabled={maxState[task.uuid]}>
              <div id={task.id} className={styles.container} ref={setRef} tabIndex={i || 1} onFocus={focusHandler} onBlur={focusHandler}>
                <Resizable>
                  <Window resizable className={''} id={`${styles['window']}`} onDrag={() => { console.log('DRAGGINGGG') }}>
                    <WindowHeader ref={setTopRef} className={styles.title} onDoubleClick={Maximize}>
                      <div className={styles.top}>
                        <figure><img src={`/${task.icon}`} alt="" /></figure>
                        <span>{task.title}</span>
                      </div>
                      <div className={styles.controlBtns}>
                        <div>
                          <button onClick={Minimize} className={styles.min}><span /></button>
                          <button onClick={Maximize} className={styles.maxed}><span /></button>
                        </div>
                        <button onClick={closeProgram}> <span className={styles.close} /> </button>
                      </div>
                    </WindowHeader>
                    <Toolbar task={task}></Toolbar>
                    <WindowContent className={styles.content}>
                      {children}
                      {/* if body property is static HTML string, render it inside the window, else call the react component*/}
                      {
                        typeof task.body === 'string' ? <article dangerouslySetInnerHTML={{ __html: task.body }}></article> : task.body()
                      }
                    </WindowContent>
                    { task.contents ? 
                      <Frame variant='well' className={styles.footer}> {`${task.contents.length} object(s)`} </Frame> :
                      <Frame></Frame>
                    }
                  </Window>
                </Resizable>
              </div>
            </Draggable>
          </>
        )
      }
}

export default ProgramWindow;
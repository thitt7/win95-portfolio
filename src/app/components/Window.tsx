import React, {useState, useRef, useEffect, useCallback, cloneElement} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import { close, setMin, setMax, setWindowRef, setTaskRef, focus } from '../reducers/programSlice';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Draggable from 'react-draggable';
import Resizable from './Resizable';

import styles from '../styles/window.module.scss';

function asyncDelay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// function Minimize (uuid: string, copy: HTMLElement, window: HTMLElement, task: HTMLElement): any {
//   console.log('MIN FN: ', uuid, copy, window, task)
//   return false
// }

const Programs = () => {

  const dispatch = useDispatch()
  const {tasks} = useSelector((state: any) => state.program)
  const [maxState, setMaxState] = useState({})
  const [clone, setClone] = useState<HTMLElement>();

  const ref = useRef<any>({});
  const maxRef = useRef<any>();
  const minRef = useRef<any>();
  const copyRef = useRef<any>({});
  const topRef = useRef<any>({});
  const windowCoords = useRef({});

  useEffect(() => {
    console.log('REF: ',ref)
    console.log('COPYREF: ',copyRef)
    console.log('TOPREF: ',topRef)
   
    tasks.forEach((element: any) => { console.log(element) });
    
  })

  return (
    <>
    
      {
        tasks.map((e: any, i: number) => {
          // if (topRef.current[e.uuid] && copyRef.current[e.uuid]) {
          //   const top = topRef.current[e.uuid].ref
          //   const copy = copyRef.current[e.uuid].ref
          // }
          // let task = (tasks.find((obj: any) => obj.uuid === e.uuid)).taskRef;


          const setRef = (el: any) => {
            // el?.focus()

            if (el && !ref.current[e.uuid]) {
              ref.current[e.uuid] = el;
              let windowRef = (tasks.find((obj: any) => obj.uuid === e.uuid)).ref;
              if (!windowRef) {dispatch(setWindowRef({uuid: e.uuid, ref: el}))}
            } 
            else { delete ref.current[e.uuid] }
          }

          const setCopyRef = (el: any) => {   
            if (el && copyRef.current) { copyRef.current[e.uuid] = {ref: el} }
          }

          const setTopRef = (el: any) => {   
            if (el && topRef.current) { topRef.current[e.uuid] = {ref: el} }
            if (topRef.current) {
              if (!clone) {setClone(topRef.current[e.uuid].ref.cloneNode(true))}
            }
          }

          const focusHandler = async () => {
            let active = (tasks.find((obj: any) => obj.uuid === e.uuid)).active;
            dispatch(focus({uuid: e.uuid, active: !active}));
          }

          const Copy = () => {
            if (clone) {
              return <div ref={setCopyRef} id={styles['copy']} dangerouslySetInnerHTML={{ __html: clone!.outerHTML}}/>
            }
            else {return ''}
          }

          const matchPosition = async () => {
            const copy = copyRef.current[e.uuid].ref;
            const top = topRef.current[e.uuid].ref;

            const rect = top.getBoundingClientRect();
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;
            const width = top.offsetWidth;
            const height = top.offsetHeight;
            
            if (maxRef[`${e.uuid}`]) {
              ref.current[e.uuid].coords = {x: x, y: y, width: width, height: height};

              copy.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
              copy.style.width = `${width - 4}px`;
              copy.style.height = `${height - 4}px`;
              copy.style.zIndex = `2`;
            }
            else {
              const {x, y, width, height} = ref.current[e.uuid].coords;

              copy.style.zIndex = `2`;
              copy.style.width = `100%`;
              copy.style.transform = `translate(0)`;
              await asyncDelay(20);
              copy.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
              copy.style.width = `${width - 4}px`;
              copy.style.height = `${height - 4}px`;
              await asyncDelay(480);
              copy.style.zIndex = '';
              copy.style.display = '';
            }
        
          }

          const closeProgram = () => {
            dispatch(close(e.uuid))
            delete ref.current[e.uuid];
            delete copyRef.current[e.uuid].ref
          }

          const Minimize = async () => {
            let task = (tasks.find((obj: any) => obj.uuid === e.uuid)).taskRef;
            const copy = copyRef.current[e.uuid].ref;
            const top = topRef.current[e.uuid].ref;

            const topX = top.getBoundingClientRect().left + window.scrollX;
            const topY = top.getBoundingClientRect().top + window.scrollY;
            const topWidth = top.offsetWidth;
            const topHeight = top.offsetHeight;

            const taskX = task.getBoundingClientRect().left + window.scrollX;
            const taskY = task.getBoundingClientRect().top + window.scrollY;
            const taskWidth = task.offsetWidth;
            const taskHeight = task.offsetHeight;

            if (!minRef || (minRef && !minRef[e.uuid])) {minRef[e.uuid] = true}
            else {minRef[e.uuid] = false}

            dispatch(setMin(e.uuid))

            copy.style.transform = `translate(${topX + 2}px, ${topY + 2}px)`;
            copy.style.width = `${topWidth - 4}px`;
            copy.style.height = `${topHeight - 4}px`;
            copy.style.zIndex = `2`;

            copy.style.display = 'block';
            await asyncDelay(1)

            copy.style.transform = `translate(${taskX + 2}px, ${taskY + 2}px)`;
            copy.style.width = `${taskWidth - 4}px`;
            copy.style.height = `${taskHeight - 4}px`;
            // copy.style.zIndex = ``;

          }

          const Maximize = async () => {
            const copy = copyRef.current[e.uuid].ref;
            const top = topRef.current[e.uuid].ref;

            if (!maxRef || (maxRef && !maxRef[e.uuid])) {maxRef[e.uuid] = true}
            else {maxRef[e.uuid] = false}

            dispatch(setMax(e.uuid))
            setMaxState((maxState)=>{return {...maxState, [e.uuid]: !maxState[e.uuid]}})

            if (topRef.current && copyRef.current[e.uuid].ref) {

              await asyncDelay(1);
              matchPosition()
              await asyncDelay(1);
              copyRef.current[e.uuid].ref.style.display = 'block';
              await asyncDelay(1);

              // const index = tasks.findIndex((el: any) => el['uuid'] == e.uuid);
              // let MAX = (tasks.find((obj: any) => obj.uuid === e.uuid)).max;
              console.log('COPYREF IN FN', copyRef.current[e.uuid])
              console.log('MAXREF IN FN', maxRef)

              if (maxRef[e.uuid]) {
                copyRef.current[e.uuid].ref.style.width = `100%`;
                copyRef.current[e.uuid].ref.style.transform = `translate(0)`;
                // await asyncDelay(500);
                copyRef.current[e.uuid].ref.style.zIndex = ``;
              }
              else {
                matchPosition()
              }

            }

            await asyncDelay(500);
            ref.current[e.uuid].classList.toggle(styles.max);
            
          }

          if (Object.keys(e).length){
            return (
              <>
                <Copy />
                <Draggable key={e.uuid} handle={`[class*=title]`} disabled={maxState[e.uuid]}>
                  <div className={styles.container} ref={setRef} tabIndex={i} onFocus={focusHandler} onBlur={focusHandler}>
                    <Resizable>
                      <Window className={styles.window} onDrag={()=>{console.log('DRAGGINGGG')}}>
                        <WindowHeader ref={setTopRef} className={styles.title} onDoubleClick={Maximize}>
                          <div className={styles.top}>
                            <figure><img src={`/${e.icon}.ico`} alt="" /></figure>
                            <span>{e.title}</span>
                          </div>
                          <div className={styles.controlBtns}>
                            <div>
                              <button onClick={Minimize} className={styles.min}><span/></button>
                              <button onClick={Maximize} className={styles.max}><span/></button>
                            </div>
                            <button onClick={closeProgram}> <span className={styles.close} /> </button>
                          </div>
                        </WindowHeader>
                        <Toolbar>
                          <Button variant='menu' size='sm'> File </Button>
                          <Button variant='menu' size='sm'> Edit </Button>
                          <Button variant='menu' size='sm' disabled> Save </Button>
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
// export {Minimize};
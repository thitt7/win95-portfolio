import React, {useState, useRef, useEffect, useCallback, cloneElement} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import { set, close, minimize, maximize } from '../reducers/programSlice';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import Resizable from './Resizable';

import styles from '../styles/window.module.scss';

function asyncDelay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const Programs = () => {

  const dispatch = useDispatch()
  const {tasks} = useSelector((state: any) => state.program)
  const [max, setMax] = useState(false)
  const [clone, setClone] = useState<HTMLElement>();

  const ref = useRef<any>({});
  const maxRef = useRef<any>()
  const copyRef = useRef<any>({});
  const topRef = useRef<any>({});
  const windowCoords = useRef({});

  useEffect(() => {
    console.log('REF: ',ref)
    console.log('COPYREF: ',copyRef)
    console.log('TOPREF: ',topRef)
    // console.log('COORDS: ', windowCoords)
   
    // console.log('TASKSSS: ',tasks)
   
    // if (topRef.current) {
    //   if (!clone) {setClone(topRef.current.cloneNode(true))}
    // }
    
    if (topRef.current && copyRef.current) {
      // const rect = topRef.current.getBoundingClientRect();
      // const x = rect.left + window.scrollX;
      // const y = rect.top + window.scrollY;
      // const width = topRef.current.offsetWidth;
      // const height = topRef.current.offsetHeight;

      // copyRef.current.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
      // copyRef.current.style.width = `${width - 4}px`;
      // copyRef.current.style.height = `${height - 4}px`;

      // copyRef.current.style.color = 'red';
      // console.log('COPYREF: ',copyRef.current)
    }
    
  })

  useEffect(() => {
    if (copyRef.current && topRef.current) {
      // matchPosition()
    }
  }, [copyRef.current])

  return (
    <>
    
      {
        tasks.map((e: any, i: number) => {

          const setCopyRef = (el: any) => {   
            if (el && copyRef.current) { copyRef.current[e.uuid] = {ref: el} }
          }

          const setTopRef = (el: any) => {   
            if (el && topRef.current) { topRef.current[e.uuid] = {ref: el} }
            if (topRef.current) {
              if (!clone) {setClone(topRef.current[e.uuid].ref.cloneNode(true))}
            }
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

          const asyncDispatch = async () => {
            dispatch(maximize(e.uuid))
            console.log('action dispatched');
          }

          const Maximize = async () => {
            const copy = copyRef.current[e.uuid].ref;
            const top = topRef.current[e.uuid].ref;

            if (!maxRef || (maxRef && !maxRef[e.uuid])) {maxRef[e.uuid] = true}
            else {maxRef[e.uuid] = false}

            // dispatch(maximize(e.uuid))

            // copyRef.current[e.uuid] = {...copyRef.current[e.uuid], max: true}
            // copyRef.current[e.uuid].max = !copyRef.current[e.uuid].max

            await asyncDispatch()
            setMax((max)=>!max)

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
                <Draggable key={e.uuid} handle={`[class*=title]`} disabled={max}>
                  <div
                  ref={element => {
                  element?.focus()
                  if (element && ref.current) { ref.current[e.uuid] = element } 
                  else { delete ref.current[e.uuid] }}} className={styles.container} 
                  tabIndex={i}>
                    <Resizable>
                      <Window className={styles.window} onDrag={()=>{console.log('DRAGGINGGG')}}>
                        <WindowHeader ref={setTopRef} className={styles.title} onDoubleClick={Maximize}>
                          <div className={styles.top}>
                            <figure><img src={`/${e.icon}.ico`} alt="" /></figure>
                            <span>{e.title}</span>
                          </div>
                          <div className={styles.controlBtns}>
                            <div>
                              <button className={styles.min}><span/></button>
                              <button onClick={Maximize} className={styles.max}><span/></button>
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
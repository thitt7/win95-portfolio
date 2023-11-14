import React, {useState, useRef, useEffect, useCallback, cloneElement} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import { set, close, minimize, maximize } from '../reducers/programSlice';
import { useSelector, useDispatch } from 'react-redux';
import { renderToStaticMarkup } from 'react-dom/server';
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
  const tasks = useSelector((state: any) => state.program.tasks)
  const [max, setMax] = useState(false)
  const [clone, setClone] = useState<HTMLElement>()
  const [el, setEl] = useState()

  let example: number;
  let windowRef: Element;
  const ref = useRef<any>({});
  const copyRef = useRef<any>({});
  const maxRef = useRef(false);
  const topRef = useRef<any>()

  let exampleEl = <div></div>
  
  // const ref = React.useCallback((node: any) => { 
  //   windowRef = node
  //   node?.focus()
  //   example = 5;
  // }, [])
  // console.log('REF: ',windowRef)

  useEffect(() => {
    // console.log('REF: ',ref)
    console.log('MAX: ',max)
    console.log('CLONE: ', clone)
    console.log('TASKSSS: ',tasks)
   
    if (topRef.current) {
      if (!clone) {console.log(setClone(topRef.current.cloneNode(true)))}
      console.log('TOPREF INNERHMTL: ',topRef.current.nodeValue)
    }
    
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
    {/* {clone ? <div ref={copyRef} id={styles['copy']} dangerouslySetInnerHTML={{ __html: clone!.outerHTML}}/> : ''} */}
    
      {
        tasks.map((e: any, i: number) => {

          const setRef = (el: any) => {
            if (el && copyRef.current) { copyRef.current[e.uuid] = el }
          }

          const Copy = () => {
            if (clone) {
              // return <div ref={copyRef} id={styles['copy']} dangerouslySetInnerHTML={{ __html: clone!.outerHTML}}/>
              return <div ref={setRef} id={styles['copy']} dangerouslySetInnerHTML={{ __html: clone!.outerHTML}}/>
            }
            // else {return ''}
          }

          const matchPosition = () => {
            console.log('COPYREF STYLES IN MP: ', copyRef.current.style)
            const rect = topRef.current.getBoundingClientRect();
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;
            const width = topRef.current.offsetWidth;
            const height = topRef.current.offsetHeight;
        
            copyRef.current[e.uuid].style.transform = `translate(${x + 2}px, ${y + 2}px)`;
            copyRef.current[e.uuid].style.width = `${width - 4}px`;
            copyRef.current[e.uuid].style.height = `${height - 4}px`;
            copyRef.current[e.uuid].style.color = 'blue';
          }

          const closeProgram = () => {
            dispatch(close(e.uuid))
            delete ref.current[e.uuid], copyRef.current[e.uuid];
            delete copyRef.current[e.uuid]
          }

          const Maximize = async () => {
            // maxRef.current = !maxRef.current
            dispatch(maximize(e.uuid))
            setMax((max)=>!max)
            console.log('REFS: ',topRef.current, copyRef.current)

            if (topRef.current && copyRef.current) {
              console.log('running top and copy ref cond')
              console.log('COPYREF STYLES: ', copyRef.current.style)

              await asyncDelay(1);
              matchPosition()
              await asyncDelay(1);
              copyRef.current[e.uuid].style.display = 'block';

              await asyncDelay(1);

              const index = tasks.findIndex((el: any) => el['uuid'] == e.uuid);
              // console.log('INDEX IN MAX FN: ', index)
              // console.log('TASK EL IN MAX FN: ', tasks[index])

              let max = (tasks.find((obj: any) => obj.uuid === e.uuid)).max;
              console.log('TASKS OBJ: ', tasks)

              if (max) {
                console.log('running maxref cond')
                copyRef.current[e.uuid].style.width = `100%`;
                copyRef.current[e.uuid].style.transform = `translate(0)`;
                copyRef.current[e.uuid].style.color = 'red';
              }
              else {
                matchPosition()
              }

            }

            await asyncDelay(1000);
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
                        <WindowHeader ref={topRef} className={styles.title} onDoubleClick={Maximize}>
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
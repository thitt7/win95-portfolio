import React, { useState, useEffect, useRef } from 'react';
import StartMenu from './StartMenu';
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';
import { close, setMin, setMax, setTaskRef } from '../reducers/programSlice';
import { useSelector, useDispatch } from 'react-redux';
import asyncDelay from '@/lib/asyncDelay';
import styles from '../styles/desktop.module.scss';
import windowStyles from '../styles/window.module.scss';

const TaskBar = () => {

    const dispatch = useDispatch()
    const {tasks} = useSelector((state: any) => state.program)

    const ref = useRef<any>({});

    // const [active, setActive] = useState(true)
    const startImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAAAAAACAAAD/AAAA/wAAgAAAAIAAAP///wCAgAD///8Zy0fQAAAAAXRSTlMAQObYZgAAAAFiS0dECmjQ9FYAAAAHdElNRQfiBhoAOBwkIrLGAAAAmUlEQVQoz7XRMQ7CMAwFUFsevNoMnMMiV+gFkDiIp+YKXdk4LnYiqEEdwdt/SuKvFuCvg6oqX3kIziw6J0Eyip6aLlfNs4KY0AKWAaAoAm+guBDvWAGL2HYAMqKES+y4DYBGZlDWgtFhj3PX7V579ICt9ngBzx5ewCP2HYCdOWGNHY8B0Nn9o4fzYY88rbXH+HClRx3BH//AJ8kFIO93liGNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAwjfNqqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NjoyOC0wNDowMPyu0hYAAAAASUVORK5CYII="

    console.log('tasks in TASKBAR: ', tasks)

    useEffect(() => {
        console.log('side effect in taskbar!!')
    
        const focusHandler = () => {
            console.log("I AM FOCUSED!!!")
        }
    })

    return (
        <AppBar style={{ alignSelf: 'flex-end', width: '100%', top: 'revert', bottom: 0 }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <StartMenu />
                <div id={styles['taskbar']}>
                    {
                        tasks.map((e: any) => {

                            const setRef = (el: any) => {
                                // el?.focus()
                    
                                if (el && !ref.current[e.uuid]) {
                                  ref.current[e.uuid] = el;
                                  let windowRef = (tasks.find((obj: any) => obj.uuid === e.uuid)).windowRef;
                                  if (!windowRef) {dispatch(setTaskRef({uuid: e.uuid, ref: el}))}
                                } 
                                // else { delete ref.current[e.uuid] }
                              }

                            const active = (tasks.find((obj: any) => obj.uuid === e.uuid)).active;

                            const taskClick = async () => {
                                // if (!active) {}
                                const min = (tasks.find((obj: any) => obj.uuid === e.uuid)).min;
                                const window = (tasks.find((obj: any) => obj.uuid === e.uuid)).windowRef;
                                const task = (tasks.find((obj: any) => obj.uuid === e.uuid)).taskRef;
                                const copy = document.querySelector(`[data-uuid='${e.uuid}']`) as HTMLElement;
                                const top = window.querySelector(`.${windowStyles.title}`);

                                if (min) {

                                    const topX: number = top.getBoundingClientRect().left;
                                    const topY: number = top.getBoundingClientRect().top;
                                    const topWidth = top.offsetWidth;
                                    const topHeight = top.offsetHeight;

                                    const taskX: number = task.getBoundingClientRect().left;
                                    const taskY: number = task.getBoundingClientRect().top;
                                    const taskWidth = task.offsetWidth;
                                    const taskHeight = task.offsetHeight;

                                    copy.style.transform = `translate(${taskX}px, ${taskY}px)`;
                                    copy.style.width = `${taskWidth}px`;
                                    copy.style.height = `${taskHeight}px`;
                                    copy.style.zIndex = `2`;
                        
                                    copy.style.display = 'block';
                                    await asyncDelay(1);
                        
                                    copy.style.transform = `translate(${topX + 2}px, ${topY + 2}px)`;
                                    copy.style.width = `${topWidth - 4}px`;
                                    copy.style.height = `${topHeight - 4}px`;
                                    await asyncDelay(240);
                                    // copy.style.zIndex = ``;
                                    copy.style.display = '';
                                    window.style.visibility = '';
                                }

                                window.focus()
                            }

                            if (Object.keys(e).length){
                                return (
                                    <div onClick={taskClick} ref={setRef} data-active={active} id={styles['program']}>
                                        <div>
                                            <figure><img src={`/${e.icon}.ico`} alt="" /></figure>
                                            <span>{e.title}</span>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <TextInput placeholder='Search...' width={150} />
            </Toolbar>
        </AppBar>
    )
}

export default TaskBar;
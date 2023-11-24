import React, { useState, useEffect, useRef } from 'react';
import StartMenu from './StartMenu';
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';
import { close, minimize, maximize, setTaskRef } from '../reducers/programSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/desktop.module.scss'

const TaskBar = () => {

    const dispatch = useDispatch()
    const {tasks} = useSelector((state: any) => state.program)

    const ref = useRef<any>({});

    // const [active, setActive] = useState(true)
    const startImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAAAAAACAAAD/AAAA/wAAgAAAAIAAAP///wCAgAD///8Zy0fQAAAAAXRSTlMAQObYZgAAAAFiS0dECmjQ9FYAAAAHdElNRQfiBhoAOBwkIrLGAAAAmUlEQVQoz7XRMQ7CMAwFUFsevNoMnMMiV+gFkDiIp+YKXdk4LnYiqEEdwdt/SuKvFuCvg6oqX3kIziw6J0Eyip6aLlfNs4KY0AKWAaAoAm+guBDvWAGL2HYAMqKES+y4DYBGZlDWgtFhj3PX7V579ICt9ngBzx5ewCP2HYCdOWGNHY8B0Nn9o4fzYY88rbXH+HClRx3BH//AJ8kFIO93liGNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAwjfNqqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NjoyOC0wNDowMPyu0hYAAAAASUVORK5CYII="

    console.log('tasks in TASKBAR: ', tasks)

    // useEffect(() => {
    //   console.log('side effect in taskbar!!')
    //   myElement.addEventListener('focus', () => {
    //     console.log('Element is focused!');
    //     myElement.classList.add('focused');
    //   });
    
    // const focusHandler = () => {
    //     console.log("I AM FOCUSED!!!")
    // }

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

                            const taskClick = () => {
                                // if (!active) {}
                                const min = (tasks.find((obj: any) => obj.uuid === e.uuid)).min;
                                const window = (tasks.find((obj: any) => obj.uuid === e.uuid)).windowRef;

                                if (min) {
                                    let task = (tasks.find((obj: any) => obj.uuid === e.uuid)).taskRef;
                                    const copy = (tasks.find((obj: any) => obj.uuid === e.uuid)).copyRef;
                                    const window = (tasks.find((obj: any) => obj.uuid === e.uuid)).windowRef;

                                    // const topX = top.getBoundingClientRect().left + window.scrollX;
                                    // const topY = top.getBoundingClientRect().top + window.scrollY;
                                    // const topWidth = top.offsetWidth;
                                    // const topHeight = top.offsetHeight;

                                    // const taskX = task.getBoundingClientRect().left + window.scrollX;
                                    // const taskY = task.getBoundingClientRect().top + window.scrollY;
                                    // const taskWidth = task.offsetWidth;
                                    // const taskHeight = task.offsetHeight;

                                    console.log('task is minimized!!')
                                    console.log('COPY: ', copy.style)
                                    console.log('WINDOW: ', window)
                                    copy.style.display = 'block';
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
'use client'

import React, { useState, useEffect } from 'react';
import { Button, MenuList, MenuListItem, Separator } from 'react95';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { set, add, remove } from '../reducers/menuSlice';
import startTask from '@/lib/startTask';

import programs from '../../../public/programs.json';

import styles from '../styles/menu.module.scss';

const startStyles = {
  width: '225px',
  margin: 0,
  position: 'absolute',
  left: '0',
  bottom: '100%', 
}

const StartMenu = () => {
  
  const dispatch = useDispatch()
  const {menu} = useSelector((state: any) => state.program, shallowEqual)

  const [open, setOpen] = useState<boolean>(false);
  const startImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAAAAAACAAAD/AAAA/wAAgAAAAIAAAP///wCAgAD///8Zy0fQAAAAAXRSTlMAQObYZgAAAAFiS0dECmjQ9FYAAAAHdElNRQfiBhoAOBwkIrLGAAAAmUlEQVQoz7XRMQ7CMAwFUFsevNoMnMMiV+gFkDiIp+YKXdk4LnYiqEEdwdt/SuKvFuCvg6oqX3kIziw6J0Eyip6aLlfNs4KY0AKWAaAoAm+guBDvWAGL2HYAMqKES+y4DYBGZlDWgtFhj3PX7V579ICt9ngBzx5ewCP2HYCdOWGNHY8B0Nn9o4fzYY88rbXH+HClRx3BH//AJ8kFIO93liGNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAwjfNqqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NjoyOC0wNDowMPyu0hYAAAAASUVORK5CYII="
  const win95startsidebar = "data:image/png;base64,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"

  const Open = (name?: string) => {
    setOpen(false)
  }

  useEffect(() => {
    const ex: any = programs['github'];
    dispatch(set({...ex}))
  }, [])
  

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Button
                            onClick={() => setOpen(!open)}
                            onBlur={() => setOpen(false)}
                            active={open}
                            style={{ fontWeight: 'bold' }}
                        >
                            <img src={startImg} alt='react95 logo' style={{ height: '20px', marginRight: 4 }} />
                            Start
                        </Button>
                        {open && (
                            
                              <MenuList onClick={() => Open()} style={startStyles} id={styles['menu']}>
                                <div style={{display: 'flex', alignItems: 'stretch'}}>
                                <aside className={styles.side}> <img src={win95startsidebar} alt="start menu " /> </aside>
                                  <div className={styles.icons}>
                                    <MenuListItem className={styles.item}><span role='img' aria-label='programs'> <img src="/w95_37.ico" alt="" /> </span> <p className={styles.title}>Programs</p> </MenuListItem>
                                    <MenuListItem className={styles.item}><span role='img' aria-label='documents'><img src="/documents-start.ico" alt="" /></span> <p className={styles.title}>Documents</p> </MenuListItem>
                                    <MenuListItem className={styles.item}><span role='img' aria-label='settings'><img src="/w95_22.ico" alt="" /></span> <p className={styles.title}>Settings</p> </MenuListItem>
                                    <MenuListItem className={styles.item}><span role='img' aria-label='photos'> 👨‍💻</span> <p className={styles.title}>Photos</p> </MenuListItem>
                                    <MenuListItem className={styles.item}><span role='img' aria-label='resume'><img src="/document-0.ico" alt="" /></span> <p className={styles.title}>Resume</p> </MenuListItem>
                                    <Separator />
                                    <MenuListItem className={styles.item}><span role='img' aria-label='shut down'><img src="/w95_46.ico" alt="" /> </span> <p className={styles.title}>Shut Down...</p> </MenuListItem>
                                  </div>
                                  </div>
                              </MenuList>
                            
                        )}
                    </div>
  )
}

export default StartMenu
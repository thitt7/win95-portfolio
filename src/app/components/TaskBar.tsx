import React, { useState } from 'react';
import StartMenu from './StartMenu';
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';

import styles from '../styles/desktop.module.scss'

const TaskBar = () => {

    const [open, setOpen] = useState<boolean>(false)
    const startImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAAAAAACAAAD/AAAA/wAAgAAAAIAAAP///wCAgAD///8Zy0fQAAAAAXRSTlMAQObYZgAAAAFiS0dECmjQ9FYAAAAHdElNRQfiBhoAOBwkIrLGAAAAmUlEQVQoz7XRMQ7CMAwFUFsevNoMnMMiV+gFkDiIp+YKXdk4LnYiqEEdwdt/SuKvFuCvg6oqX3kIziw6J0Eyip6aLlfNs4KY0AKWAaAoAm+guBDvWAGL2HYAMqKES+y4DYBGZlDWgtFhj3PX7V579ICt9ngBzx5ewCP2HYCdOWGNHY8B0Nn9o4fzYY88rbXH+HClRx3BH//AJ8kFIO93liGNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAwjfNqqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NjoyOC0wNDowMPyu0hYAAAAASUVORK5CYII="

    return (
            <AppBar style={{ alignSelf: 'flex-end', width: '100%', top: 'revert', bottom: 0 }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <StartMenu/>
                    <TextInput placeholder='Search...' width={150} />
                </Toolbar>
            </AppBar>
    )
}

export default TaskBar
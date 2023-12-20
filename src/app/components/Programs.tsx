import React, {useState, useRef, useEffect, useCallback, cloneElement} from 'react';
import { Frame, Window, WindowContent, WindowHeader } from 'react95';
import { close, setMin, setMax, setWindowRef, setCopyRef, focus } from '../reducers/programSlice';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Draggable from 'react-draggable';
import ProgramWindow from './Window';

const Programs = () => {

  const dispatch = useDispatch()
  const {tasks} = useSelector((state: any) => state.program)

  // useEffect(() => {
  //   // console.log('REF: ',ref)
  //   // console.log('COPYREF: ',copyRef)
  //   console.log('TASKS: ',tasks)
   
  //   // tasks.forEach((element: any) => { console.log(element) });
  // })

  const exclude = ['recycle']

  return (
    <>
    
      {
        tasks.map((e: any, i: number) => {
          if (!exclude.includes(e.name)) {
            return (
              <ProgramWindow task={e} i={i}></ProgramWindow>
            )
          }
        })
      }
    </>
  )
}

export default Programs;
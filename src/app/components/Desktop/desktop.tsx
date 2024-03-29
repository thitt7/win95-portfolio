'use client';

import TaskBar from '../TaskBar';
import React, { useState, useRef, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as desktop from '../../reducers/desktopSlice';
import startTask from '@/lib/startTask';
import Programs from './Programs';
import RecycleIcon from './Recycle';
import StartMessage from '../Messages/StartMessage';

import styles from '@styles/desktop.module.scss';

export function Desktop() {
  
  const [message, setMessage] = useState({
    body: `Welcome to my portfolio! I'm Tristan Hitt, a Full-Stack developer with a passion for JavaScript/TypeScript who grew up in the early 2000s with Windows 95 era operating systems
     as my first glimpse into desktop computing. Have a look around and see if you can find all the goodies I've included. I've spared no expense to try and make this the most
      immersive recreation of the classic Windows 95 without actually emulating it.`,
    type: "success",
    title: "Hello World!"
  })

  const {items, selected} = useSelector((state: any) => state.desktop);
  const dispatch = useDispatch();

  const desktopRef = useRef<any>();
  const spaceRef = useRef<any>();
  const iconsArr = useRef<any>({selected: Array(items.length).fill(false), ref: []});

  const multipleSelected = selected.filter(el => el === true).length > 1;

  const setIconRef = (e: Element, i: number) => {
    iconsArr.current.ref[i] = e;
  }

const selectIcon = (e?: React.MouseEvent, i?: number) => {
  console.log('CLICK EVENT: ', e)
  e?.preventDefault();

  iconsArr.current.selected[i] = true;
  iconsArr.current.ref[i].classList.add(styles.selected);

  
  if (e?.ctrlKey) {}

  else if (e?.shiftKey) {
      let n = iconsArr.current.selected.length;
      let first = -1, last = -1;

      for (let i = 0; i < n; i++) {
          if (!iconsArr.current.selected[i])
              continue;
          if (first == -1){first = i}
          last = i;
      }
      
      for (let i = first; i <= last; i++) {
          iconsArr.current.ref[i]?.classList.add(styles.selected);
          iconsArr.current.selected[i] = true;
      }
  }

  else {
      if (Object.values(iconsArr.current.ref).some((val: HTMLElement) => {return val?.classList?.contains(styles.selected)})) {
        for (let [index, e] of iconsArr.current.ref.entries()) {

          if (index == i) {
            iconsArr.current.ref[index]?.classList.add(styles.selected);
            iconsArr.current.selected[index] = true;
          }
          else {
              iconsArr.current.ref[index]?.classList ? iconsArr.current.ref[index]?.classList.remove(styles.selected) : ''
              iconsArr.current.selected[index] = false;
          }
        }
      }
      else {
          iconsArr.current.ref[i].classList.add(styles.selected);
          iconsArr.current.selected[i] = true;
      }
  }
  dispatch(desktop.setSelected(iconsArr.current.ref.map((e)=>{return e?.classList?.contains(styles.selected)})))
}

const selectIconByIndex = (index: number) => {
  iconsArr.current.ref[index]?.classList.add(styles.selected);
  iconsArr.current.selected[index] = true;
}

const setSelectedByIndex = (index: number) => {
  function createBooleanArray(length, indexToTrue) {
    return Array.from({ length }, (_, index) => index === indexToTrue);
  }
  dispatch(desktop.setSelected(createBooleanArray(iconsArr.current.ref.length, index)))
}

const dragSelect = (index: number) => {
  if (selected[index] !== true) {
    ResetIcons()
    setSelectedByIndex(index)
  }
}

const ResetIcons = () => {
  const anySelected = Object.values(iconsArr.current.ref).some((val: HTMLElement) => {return val?.classList?.contains(styles.selected)})
  for (let [i, e] of iconsArr.current.ref.entries()) {
    iconsArr.current.selected[i] = false;
    iconsArr.current.ref[i]?.classList.remove(styles.selected);
  }
  /* remove selected class from all other icons */
  for (let [i, e] of document.querySelectorAll(`.${styles.icon}`).entries()) { e.classList.remove(styles.selected) }

  iconsArr.current.ref = iconsArr.current.ref.slice(0, items.length);
  iconsArr.current.selected = iconsArr.current.selected.slice(0, items.length)
  if (anySelected) {dispatch(desktop.setSelected(Array(items.length).fill(false)))}
}

useEffect(() => {
  if (desktopRef.current) {desktopRef.current.style.paddingBottom = `${document.querySelector('header')?.offsetHeight}px`}
    
    const handleClick = (event) => {
      console.log('global click handler', event);
      const anySelected = Object.values(iconsArr.current.ref).some((val: HTMLElement) => {return val?.classList?.contains(styles.selected)})
      const isNotIcon = !event.target.closest(`.${styles.icon}`) && !event.target.classList.contains(styles.icon)

      if (isNotIcon) {
        ResetIcons();
      }

      else if (!isNotIcon && (event.target.closest(`.${styles.icon}`) || event.target.classList.contains(styles.icon))) {
        event.target.closest(`.${styles.icon}`).classList.add(styles.selected)
      }
  }


  /* If recycle bin window is open and contains any items, then bind event handler */
  // if (task && binItems.length) {document.onmousedown = handleClick;}
  const el = spaceRef.current;
  el.addEventListener("pointerdown", createDiv);
  document.onmousedown = handleClick;

  /* Drag Selection */
  const selectables = [];
    const selectableElems = [...document.querySelectorAll(`.${styles.icon}`)];
    for (const selectable of selectableElems as HTMLElement[]) {
        const { x, y, width, height } = selectable.getBoundingClientRect();
        selectables.push({ x: x + window.scrollX, y: y + window.scrollY, width, height, elem: selectable });
        selectable.dataset.info = JSON.stringify({ x, y, width, height });
    }

    function checkSelected(selectAreaElem) {
        const select = selectAreaElem.getBoundingClientRect();
        const { x, y, height, width } = select;
        for (const selectable of selectables) {
            if (checkRectIntersection({ x: x + window.scrollX, y: y + window.scrollY, height, width }, selectable)) {
                selectable.elem.classList.add(styles.selected);
            }
            else {
                selectable.elem.classList.remove(styles.selected);
            }
        }
        iconsArr.current.selected = iconsArr.current.ref.map((e)=>{return e?.classList?.contains(styles.selected)});
        dispatch(desktop.setSelected(iconsArr.current.ref.map((e)=>{return e?.classList?.contains(styles.selected)})))
    }

    function checkRectIntersection(r1, r2) {
        return !(r1.x + r1.width < r2.x ||
            r2.x + r2.width < r1.x ||
            r1.y + r1.height < r2.y ||
            r2.y + r2.height < r1.y);
    }

    async function createDiv(event) {
        if (event.target !== this) {return}
        event.preventDefault();
        spaceRef.current.focus();
        // event.stopPropagation();

        const x = event.pageX;
        const y = event.pageY;

        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "0";
        div.style.height = "0";
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.classList.add(styles.dragSelect);
        document.body.append(div);

        function resize(event) {
            const diffX = event.pageX - x;
            const diffY = event.pageY - y;
            div.style.left = diffX < 0 ? x + diffX + "px" : x + "px";
            div.style.top = diffY < 0 ? y + diffY + "px" : y + "px";
            div.style.height = Math.abs(diffY) + "px";
            div.style.width = Math.abs(diffX) + "px";
            checkSelected(div);
        }
        selectables.forEach(item => item.elem.classList.remove(styles.selected));
        addEventListener("pointermove", resize);
        addEventListener("pointerup", () => {
            removeEventListener("pointermove", resize);
            div.remove();
        });
        handleClick(event);
    }

    return () => {
      el.removeEventListener("pointerdown", createDiv);
      document.removeEventListener('onmousedown', handleClick);
    }
})

  return (
    <>
    {/* <DragSelect /> */}
      <div className={styles.container} ref={desktopRef}>
        <div className={styles.space} ref={spaceRef} tabIndex={-1}>
          <RecycleIcon reset={ResetIcons}/>
          {items.map((e: any, i: number) => {
            if (Object.keys(e).length) {
              return (
                <>
                  <DesktopIcon iconRef={(e) => setIconRef(e, i)} task={e} onClick={(e) => selectIcon(e, i)} selectIcon={() => selectIconByIndex(i)} onMouseDown={() => dragSelect(i)}/>
                </>
              )
            }
          })}
      
          <Programs />
          <StartMessage type={message.type} title={message.title}>{message.body}</StartMessage>
        </div>
        <TaskBar />
      </div>
    </>
  );
}
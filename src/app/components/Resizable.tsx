import React, {useRef, useEffect} from 'react'

const Resizable = ({children}: {children: React.ReactNode}) => {
    const Box = useRef(null)
    const Top = useRef(null)
    const Right = useRef(null)
    const Bottom = useRef(null)
    const Left = useRef(null)

    ﻿
    useEffect(() => {
        const resizeableElement = Box.current!;
        const styles = window.getComputedStyle(resizeableElement);
        let width = parseInt(styles.width, 10) // 100px -> 100 const height = parseInt(styles.height, 18) // 100px -> 100
        let height = parseInt(styles.height, 10)

        let xCoord = 0;
        let yCoord = 0;

        resizeableElement.style.top = "150px";
        resizeableElement.style.left = "150px";

        // TOP
        const onMouseMoveTopResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord
            height = height - dy;
            yCoord = event.clientY;
            yCoord;
            resizeableElement.style.height = `${height}px`;
        }
        
        const onMouseUpTopResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveTopResize);
        };
        
        
        const onMouseDownTopResize = (event: MouseEvent) => {
            yCoord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = styles.bottom;
            resizeableElement.style.top = null;
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

    }, [])

  return (
    <div ref={Box} className="resizable">
        {children}
        <span ref={Top} className='resizable-n'></span>
        <span ref={Right} className='resizable-e'></span>
        <span ref={Bottom} className='resizable-s'></span>
        <span ref={Left} className='resizable-w'></span>
    </div>
  )
}

export default Resizable
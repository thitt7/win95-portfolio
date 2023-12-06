import React, {useRef, useEffect, useLayoutEffect} from 'react';

import styles from '../styles/window.module.scss';

const Resizable = ({children}: {children: React.ReactNode}) => {
    const Box = useRef<HTMLDivElement>(null)
    const Top = useRef<HTMLElement>(null)
    const Right = useRef<HTMLElement>(null)
    const Bottom = useRef<HTMLElement>(null)
    const Left = useRef<HTMLElement>(null)
    const NE = useRef<HTMLElement>(null)
    const SE = useRef<HTMLElement>(null)
    const SW = useRef<HTMLElement>(null)
    const NW = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const resizeableElement = Box.current!;
        // resizeableElement.style.transform = `translate(-50%, -50%)`;
        // resizeableElement.style.top = "50%";
        // resizeableElement.style.left = "50%";
        // console.log('RESIZABLE WIDTH: ',Box.current!.offsetWidth)
        resizeableElement.style.transform = `translate(-${(Box.current!.offsetWidth)/2}px, -${(Box.current!.offsetHeight)/2}px)`;
    }, [])

    useEffect(() => {
        const resizeableElement = Box.current!;
        const styles = window.getComputedStyle(resizeableElement);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);

        let xCoord = 0;
        let yCoord = 0;

        // Top
        const onMouseMoveTopResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord;
            height = height - dy;
            yCoord = event.clientY;
            resizeableElement.style.height = `${height}px`;
        }
        
        const onMouseUpTopResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveTopResize);
        };
        
        const onMouseDownTopResize = (event: MouseEvent) => {
            yCoord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = styles.bottom;
            resizeableElement.style.top = null as any;
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

        // Right
        const onMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - xCoord;
            xCoord = event.clientX;
            width = width + dx;
            resizeableElement.style.width = `${width}px`;
        }
        
        const onMouseUpRightResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveRightResize);
        };
        
        const onMouseDownRightResize = (event: MouseEvent) => {
            xCoord = event.clientX;
            resizeableElement.style.left = styles.left;
            resizeableElement.style.right = null as any;
            document.addEventListener("mousemove", onMouseMoveRightResize);
            document.addEventListener("mouseup", onMouseUpRightResize);
        };

        // Bottom
        const onMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord;
            height = height + dy;
            yCoord = event.clientY;
            resizeableElement.style.height = `${height}px`;
        }
        
        const onMouseUpBottomResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveBottomResize);
        };
        
        const onMouseDownBottomResize = (event: MouseEvent) => {
            yCoord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.top = styles.top;
            resizeableElement.style.bottom = null as any;
            document.addEventListener("mousemove", onMouseMoveBottomResize);
            document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        // Left
        const onMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - xCoord;
            xCoord = event.clientX;
            width = width - dx;
            resizeableElement.style.width = `${width}px`;
        }
        
        const onMouseUpLeftResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveLeftResize);
        };
        
        const onMouseDownLeftResize = (event: MouseEvent) => {
            xCoord = event.clientX;
            resizeableElement.style.right = styles.right;
            resizeableElement.style.left = null as any;
            document.addEventListener("mousemove", onMouseMoveLeftResize);
            document.addEventListener("mouseup", onMouseUpLeftResize);
        };

        /* North East */
        const onMouseMoveNEResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord;
            const dx = event.clientX - xCoord;
            width = width + dx;
            height = height - dy;
            yCoord = event.clientY;
            xCoord = event.clientX;
            resizeableElement.style.height = `${height}px`;
            resizeableElement.style.width = `${width}px`;
        }
        
        const onMouseUpNEResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveNEResize);
        };
        
        const onMouseDownNEResize = (event: MouseEvent) => {
            yCoord = event.clientY;
            xCoord = event.clientX;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = styles.bottom;
            resizeableElement.style.top = null as any;
            resizeableElement.style.left = styles.left;
            resizeableElement.style.right = null as any;
            document.addEventListener("mousemove", onMouseMoveNEResize);
            document.addEventListener("mouseup", onMouseUpNEResize);
            
        };

        /* South East */
        const onMouseMoveSEResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord;
            const dx = event.clientX - xCoord;
            width = width + dx;
            height = height + dy;
            yCoord = event.clientY;
            xCoord = event.clientX;
            resizeableElement.style.height = `${height}px`;
            resizeableElement.style.width = `${width}px`;
        }
        
        const onMouseUpSEResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveSEResize);
        };
        
        const onMouseDownSEResize = (event: MouseEvent) => {
            yCoord = event.clientY;
            xCoord = event.clientX;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.top = styles.top;
            resizeableElement.style.bottom = null as any;
            resizeableElement.style.left = styles.left;
            resizeableElement.style.right = null as any;
            document.addEventListener("mousemove", onMouseMoveSEResize);
            document.addEventListener("mouseup", onMouseUpSEResize);
        };

        /* North West */
        const onMouseMoveNWResize = (event: MouseEvent) => {
            const dx = event.clientX - xCoord;
            const dy = event.clientY - yCoord;
            width = width - dx;
            height = height - dy;
            xCoord = event.clientX;
            yCoord = event.clientY;
            resizeableElement.style.width = `${width}px`;
            resizeableElement.style.height = `${height}px`;
        }
        
        const onMouseUpNWResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveNWResize);
        };
        
        const onMouseDownNWResize = (event: MouseEvent) => {
            xCoord = event.clientX;
            yCoord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = styles.bottom;
            resizeableElement.style.top = null as any;
            resizeableElement.style.right = styles.right;
            resizeableElement.style.left = null as any;
            document.addEventListener("mousemove", onMouseMoveNWResize);
            document.addEventListener("mouseup", onMouseUpNWResize);
        };

        /* South West */
        const onMouseMoveSWResize = (event: MouseEvent) => {
            const dx = event.clientX - xCoord;
            const dy = event.clientY - yCoord;
            width = width - dx;
            height = height + dy;
            xCoord = event.clientX;
            yCoord = event.clientY;
            resizeableElement.style.width = `${width}px`;
            resizeableElement.style.height = `${height}px`;
        }
        
        const onMouseUpSWResize = (event: MouseEvent) => {
            document.removeEventListener("mousemove", onMouseMoveSWResize);
        };
        
        const onMouseDownSWResize = (event: MouseEvent) => {
            xCoord = event.clientX;
            yCoord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = null as any;
            resizeableElement.style.top = styles.top;
            resizeableElement.style.right = styles.right;
            resizeableElement.style.left = null as any;
            document.addEventListener("mousemove", onMouseMoveSWResize);
            document.addEventListener("mouseup", onMouseUpSWResize);
        };

        /* Add Mousedown Event Listeners */
        const resizeRight = Right.current!;
        resizeRight.addEventListener("mousedown", onMouseDownRightResize);

        const resizeTop = Top.current!;
        resizeTop.addEventListener("mousedown", onMouseDownTopResize);

        const resizeBottom = Bottom.current!;
        resizeBottom.addEventListener("mousedown", onMouseDownBottomResize);

        const resizeLeft = Left.current!;
        resizeLeft.addEventListener("mousedown", onMouseDownLeftResize);

        const resizeNE = NE.current!;
        resizeNE.addEventListener("mousedown", onMouseDownNEResize);

        const resizeSE = SE.current!;
        resizeSE.addEventListener("mousedown", onMouseDownSEResize);

        const resizeNW = NW.current!;
        resizeNW.addEventListener("mousedown", onMouseDownNWResize);

        const resizeSW = SW.current!;
        resizeSW.addEventListener("mousedown", onMouseDownSWResize);

        return () => {
            resizeTop.removeEventListener("mousedown", onMouseDownTopResize);
            resizeRight.removeEventListener("mousedown", onMouseDownRightResize);
            resizeBottom.removeEventListener("mousedown", onMouseDownBottomResize);
            resizeLeft.removeEventListener("mousedown", onMouseDownLeftResize);
            resizeNE.removeEventListener("mousedown", onMouseDownNEResize);
            resizeSE.removeEventListener("mousedown", onMouseDownSEResize);
            resizeSE.removeEventListener("mousedown", onMouseDownNWResize);
            resizeSE.removeEventListener("mousedown", onMouseDownSWResize);
        }

    }, [])

  return (
    // <div className={styles.wrapper}>
        <div ref={Box} className={styles.resizable}>
            {children}
            <span ref={Top} className='resizable-n'></span>
            <span ref={Right} className='resizable-e'></span>
            <span ref={Bottom} className='resizable-s'></span>
            <span ref={Left} className='resizable-w'></span>
            <span ref={NE} className='resizable-ne'></span>
            <span ref={SE} className='resizable-se'></span>
            <span ref={NW} className='resizable-nw'></span>
            <span ref={SW} className='resizable-sw'></span>
        </div>
    // </div>
  )
}

export default Resizable;
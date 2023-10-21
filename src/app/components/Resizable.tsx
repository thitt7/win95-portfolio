import React, {useRef, useEffect} from 'react';

import styles from '../styles/window.module.scss';

const Resizable = ({children}: {children: React.ReactNode}) => {
    const Box = useRef<HTMLDivElement>(null)
    const Top = useRef<HTMLElement>(null)
    const Right = useRef<HTMLElement>(null)
    const Bottom = useRef<HTMLElement>(null)
    const Left = useRef<HTMLElement>(null)
    const NE = useRef<HTMLElement>(null)
    const SE = useRef<HTMLElement>(null)

    useEffect(() => {
        const resizeableElement = Box.current!;
        const styles = window.getComputedStyle(resizeableElement);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);

        let xCoord = 0;
        let yCoord = 0;

        resizeableElement.style.top = "150px";
        resizeableElement.style.left = "150px";

        // Top
        const onMouseMoveTopResize = (event: MouseEvent) => {
            const dy = event.clientY - yCoord;
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

        return () => {
            resizeTop.removeEventListener("mousedown", onMouseDownTopResize);
            resizeRight.removeEventListener("mousedown", onMouseDownRightResize);
            resizeBottom.removeEventListener("mousedown", onMouseDownBottomResize);
            resizeLeft.removeEventListener("mousedown", onMouseDownLeftResize);
            resizeNE.removeEventListener("mousedown", onMouseDownNEResize);
            resizeSE.removeEventListener("mousedown", onMouseDownSEResize);
        }

    }, [])

  return (
    <div ref={Box} className={styles.resizable}>
        {children}
        <span ref={Top} className='resizable-n'></span>
        <span ref={Right} className='resizable-e'></span>
        <span ref={Bottom} className='resizable-s'></span>
        <span ref={Left} className='resizable-w'></span>
        <span ref={NE} className='resizable-ne'></span>
        <span ref={SE} className='resizable-se'></span>
    </div>
  )
}

export default Resizable
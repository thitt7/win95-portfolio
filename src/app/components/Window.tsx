import React, {useState, useEffect} from 'react';
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';

import styles from '../styles/window.module.scss';

// const ProgramWindow = () => {

//     const [width, setWidth] = useState<number>(500)
//     const [height, setHeight] = useState<number>(300)

//     const onResize = (event: any, {node, size, handle}: any) => {
//         console.log('SIZE: ',size);
//         setWidth(size.width);
//         setHeight(size.height);
//       };

//     //   const props = {width: 500, height: 200, onResize: onResize, resizeHandles: ['se']}
//     console.log('width: ', width, 'height: ', height)

//   return (
    
//         <>
//           {/* <Draggable handle="[class*=title]">
//           <Resizable className={styles.resizable} height={height} width={width} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']} onResize={onResize}>
//           <Window resizable className={styles.window} style={{width: width + 'px', height: height + 'px'}}>
//               <WindowHeader className={styles.title}>
//                 <span> is the <s>worst</s> best!</span>
//                 <Button>
//                   <span className={styles.close} />
//                 </Button>
//               </WindowHeader>
//               <Toolbar>
//                 <Button variant='menu' size='sm'>
//                   File
//                 </Button>
//                 <Button variant='menu' size='sm'>
//                   Edit
//                 </Button>
//                 <Button variant='menu' size='sm' disabled>
//                   Save
//                 </Button>
//               </Toolbar>
//               <WindowContent>
//                 <p>
//                   I'm so glad I got this thing working. getting it to drag and resize wasn't as easy as I thought it would be lmao
//                 </p>
//               </WindowContent>
          
//             </Window>
//             </Resizable>
//             </Draggable> */}
//             <Draggable handle='.lol'>
//             <Resizable className={styles.resizable} height={height} width={width} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']} onResize={onResize}>
//               <div style={{background: 'gray', width: width + 'px', height: height + 'px', padding: '5px'}}>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum autem dolorem qui iusto assumenda. Soluta, 
//                 optio voluptatem fuga veritatis blanditiis repudiandae minus perferendis quisquam atque, consequuntur laborum hic. Sapiente, earum!
//                 <article className="lol">Look at me</article>
//               </div>
//             </Resizable>
//             </Draggable>
//         </>
    
//   )
// }

// export default ProgramWindow

class ProgramWindow extends React.Component {
  state = {
    width: 400,
    height: 200,
  };

  // On top layout
  onResize = (event: any, {node, size, handle}: any) => {
    this.setState({width: size.width, height: size.height});
  };

  render() {
    return (
      <Draggable handle='.lol'>
      <Resizable height={this.state.height} width={this.state.width} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']} onResize={this.onResize}>
        <div className={` box`} style={{background: 'blue', width: this.state.width + 'px', height: this.state.height + 'px'}}>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sequi animi delectus excepturi vero aliquam error,
             maiores itaque impedit nulla corporis ullam a! Accusantium perspiciatis reiciendis eligendi
             <article className="lol">Look at me</article>
             </span>
        </div>
      </Resizable>
      </Draggable>
    );
  }
}

export default ProgramWindow
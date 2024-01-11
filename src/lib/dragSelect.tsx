'use client';

import styles from '@styles/desktop.module.scss'

const DragSelect = () => {

    const selectables = [];
    const selectableElems = [...document.querySelectorAll(".selectable")];
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
            } else {
                selectable.elem.classList.remove(styles.selected);
            }
        }
    }
    // ------------

    function checkRectIntersection(r1, r2) {
        return !(r1.x + r1.width < r2.x ||
            r2.x + r2.width < r1.x ||
            r1.y + r1.height < r2.y ||
            r2.y + r2.height < r1.y);
    }

    // const el = document.querySelector('[class*=space]')
    // el.addEventListener("pointerdown", createDiv);
    addEventListener("pointerdown", createDiv)

    async function createDiv(event) {
        console.log('drag selecting...')
        event.preventDefault();
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
    }
  return (
    <div>dragSelect</div>
  )
}

export default DragSelect;
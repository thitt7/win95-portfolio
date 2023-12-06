import React from 'react';
import Router from 'next/router';

import styles from '../styles/window.module.scss';

const Toolbar = ({ children, task}: { children?: React.ReactNode, task: any }) => {
    return (
        <div className={styles.toolbar} dangerouslySetInnerHTML={{ __html: task.toolbar }}>
        </div>
    )
}

export default Toolbar;
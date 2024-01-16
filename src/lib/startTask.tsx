'use client';

import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../app/reducers/programSlice';
import store from '../app/store';

import programs from '@components/Programs/Programs';

const startTask = (task?: any, name?: string) => {
    const program: any = programs[`${name as keyof typeof programs}`];
    
    if (task) {store.dispatch(set({...task, running: true, windowed: true, uuid: uuidv4()}));}
    else if (name) {store.dispatch(set({...program, running: true, windowed: true, uuid: uuidv4()}));}
}

export default startTask;
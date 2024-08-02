import { createContext } from 'react';
import { ContextValue } from '../type';



export const defaultValue: ContextValue = {
  isOpenModal: {
    get: false,
    set: () => { },
  },
  dataModal: {
    get: null,
    set: () => { },
  },
  isModalResult: {
    get: false,
    set: () => { },
  },
  currentAction: {
    get: null,
    set: () => { },
  },
  newName: {
    get: '',
    set: () => { },
  },
  columns: {
    get: [],
    set: () => { },
  },
  rows: {
    get: [],
    set: () => { },
  },
};

export const MyContext = createContext<ContextValue>(defaultValue);

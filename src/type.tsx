export interface Column {
   title: string;
   id: string;
}

export interface Row {
   title: string;
   id: string;
   row: { value: boolean, id: string }[];
}

export interface DataModal {
   title: string;
   input: boolean;
}

export interface settingButtons {
   flag: string;
   index: number;
   value: string;
}

export interface ActionMap {
   [key: string]: () => void
}

export interface UserActions {
   add: { displayName: string, key: string },
   edit: { displayName: string, key: string },
   delete: { displayName: string, key: string }
}

export interface ValidNumber {
   min: number;
   max: number
}

export interface ContextValue {
   isOpenModal: {
      get: boolean;
      set: React.Dispatch<React.SetStateAction<boolean>>;
   };
   dataModal: {
      get: DataModal | null;
      set: React.Dispatch<React.SetStateAction<DataModal | null>>;
   };
   isModalResult: {
      get: boolean;
      set: React.Dispatch<React.SetStateAction<boolean>>;
   };
   currentAction: {
      get: settingButtons | null;
      set: React.Dispatch<React.SetStateAction<settingButtons | null>>;
   };
   newName: {
      get: string;
      set: React.Dispatch<React.SetStateAction<string>>;
   };
   columns: {
      get: Column[];
      set: React.Dispatch<React.SetStateAction<Column[]>>;
   };
   rows: {
      get: Row[];
      set: React.Dispatch<React.SetStateAction<Row[]>>;
   };


}
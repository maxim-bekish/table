export type Column = number;

export interface Row {
   title: string;
   row: boolean[];
}

export interface DataModal {
   title: string;
   input: boolean;
}

export interface settingButtons {
   flag: string;
   id: number;
   value: string;
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
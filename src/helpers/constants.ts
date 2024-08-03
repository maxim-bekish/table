import { UserActions, ValidNumber } from "../type";


export const inactivityTimeout: number = 3000; // Время задержки менюшки с действиями (add, edit,del)

export const delayTime: number = 0;  // Время задержки генерации столбцов и строк (симулятор ответа от сервера)

export const validNumber: ValidNumber = {
   min: 3, // Минимальное количество столбцов и строк
   max: 100, // Максимальное количество столбцов и строк
};

// кнопки на доп меню
export const userActions: UserActions = {
   add: { displayName: 'Add', key: 'add' },
   edit: { displayName: 'Edit', key: 'edit' },
   delete: { displayName: 'Delete', key: 'del' },
};

// настройка для модалки
export const actionConfigs = {
   [userActions.add.key]: { text: (value: string) => `Добавить новую строку под строкой "${value}"?`, input: false },
   [userActions.edit.key]: { text: (value: string) => `Изменить имя строки "${value}"?`, input: true },
   [userActions.delete.key]: { text: (value: string) => `Удалить строку "${value}"?`, input: false },
};
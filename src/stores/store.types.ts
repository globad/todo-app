export type ToDo = {
  content: string;
  completed: boolean;
}

export type ToDoList = {
  name: string;
  todos: ToDo[];
}

export type TodoState = {
  count: number;
  list: ToDoList[];
}

export type Actions = {
  addList: () => void;
  updateList: (id: number, newList: ToDoList) => void;
  removeList: (id: number) => void;
}

export type TodoStore = TodoState & Actions;

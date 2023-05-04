import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrar,
  crear,
  editar,
  limpiarTodos,
  toggle,
  toggleAll,
} from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Salvar a Thanos'),
  new Todo('Comprar traje de ironman'),
  new Todo('Robar un banco'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(limpiarTodos, (state) => state.filter((todo) => !todo.completado)),

  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),

  // on(toggleAll, (state, { completado }) => {
  //   console.log('entra');
  //   return state.map((todo) => {
  //     return {
  //       ...todo,
  //       completado: completado,
  //     };
  //   });
  // }),

  on(toggle, (state, { id }) => {
    const res = state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
    console.log('resuiltado ', res);
    return res;
  }),

  on(editar, (state, { id, texto }) => {
    console.log('editar');
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  })
);

export function todoReducer(state: any, actions: Action) {
  return _todoReducer(state, actions);
}

import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK } from './actions';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

const rootReducer = (state = initialState, action) => {
  let newTasks;
  switch (action.type) {
    case ADD_TASK:
      newTasks = [
        ...state.tasks,
        { id: Date.now(), text: action.payload.text, completed: false }
      ];
      break;
    case DELETE_TASK:
      newTasks = state.tasks.filter(task => task.id !== action.payload.id);
      break;
    case EDIT_TASK:
      newTasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text } : task
      );
      break;
    case TOGGLE_TASK:
      newTasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
      );
      break;
    default:
      return state;
  }
  
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  return { ...state, tasks: newTasks };
};

export default rootReducer;
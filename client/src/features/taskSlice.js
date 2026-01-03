import { createSlice } from '@reduxjs/toolkit';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../thunks/taskThunk';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/localStorage';

const initialState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        saveTasksToStorage(state.tasks);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        saveTasksToStorage(state.tasks);
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
          saveTasksToStorage(state.tasks);
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
        saveTasksToStorage(state.tasks);
      });
  },
});

export default taskSlice.reducer;

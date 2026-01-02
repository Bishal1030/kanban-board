import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTaskApi,
  getTasksApi,
  updateTaskApi,
  deleteTaskApi,
} from './api';

export const createTask = createAsyncThunk(
  'task/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await createTaskApi(payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  'task/list',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getTasksApi();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ id, updateObj }, { rejectWithValue }) => {
    try {
      const { data } = await updateTaskApi(id, updateObj);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

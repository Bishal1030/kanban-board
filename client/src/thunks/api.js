import axios from 'axios';

const api = axios.create({
  baseURL: `/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ---------- TASK APIs ---------- */
export const createTaskApi = (data) => api.post('/task', data);
export const getTasksApi = () => api.get('/task');
export const updateTaskApi = (id, data) => api.patch(`/task/${id}`, data);
export const deleteTaskApi = (id) => api.delete(`/task/${id}`);

export default api;

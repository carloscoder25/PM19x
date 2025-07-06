import axios from 'axios';

const API_BASE_URL = 'https://tu-api.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar el token si está disponible
    // const token = store.getState().auth.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post('/usuario.js', userData);
export const loginUser = (credentials) => api.post('/login.js', credentials);
export const getTransactions = (filters) => api.get('/transacciones.js', { params: filters });
export const createTransaction = (transactionData) => api.post('/transaccion.js', transactionData);
export const getBudgets = () => api.get('/presupuestos.js');
export const createBudget = (budgetData) => api.post('/presupuesto.js', budgetData);

export default api;
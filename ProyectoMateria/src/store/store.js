import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import transactionsReducer from './reducers/transactions';
import budgetsReducer from './reducers/budgets';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  budgets: budgetsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // solo persistir el estado de autenticación
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
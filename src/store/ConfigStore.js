import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { rootReducer } from '../redux/reducer/RootReducer'
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: "root",
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer,applyMiddleware(thunk));
export const persistor = persistStore(store)

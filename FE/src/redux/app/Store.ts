import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "../features/userSlice"
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig ={
  key: 'root',
  version: 1,
  REHYDRATE: false,
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)


export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

 export type RootState = ReturnType<typeof Store.getState>

// export type AppDispatch = typeof Store.dispatch

const persistor = persistStore(Store);

export default Store;
export {persistor}
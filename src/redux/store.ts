import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice"
import { baseApi } from './api/baseApi'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

const prConfig ={
    key:'auth',
    storage
}

const persistAuthReducher = persistReducer(prConfig,authReducer);

export const store= configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer,
    auth:persistAuthReducher
  },
  middleware:getDefaultMiddlewares=>getDefaultMiddlewares({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
  }).concat(baseApi.middleware)
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const persistor = persistStore(store)
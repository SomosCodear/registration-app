import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { checkinApi } from 'services/api';

const store = configureStore({
  reducer: combineReducers({
    [checkinApi.reducerPath]: checkinApi.reducer,
  }),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    checkinApi.middleware,
  ],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;

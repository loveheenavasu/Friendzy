import {configureStore} from '@reduxjs/toolkit';
import LoginAction from './redux/LoginAction';
import ChatAction from './redux/ChatAction';

export const store = configureStore({
  reducer: {
    login_Reducer: LoginAction,
    chatAction: ChatAction,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

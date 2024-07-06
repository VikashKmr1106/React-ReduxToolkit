// redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import imageReducer from './Slice/Images.slice';
import authReducer from './Slice/auth.slice';
import rememberReducer from './Slice/Remember.slice';
import postReducer from './Slice/Post.slice';
import productReducer from './Slice/Products.slice';
import cartReducer from './Slice/Cart.slice';

// Create persist configs for each reducer
const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const rememberPersistConfig = {
  key: 'remember',
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRememberReducer = persistReducer(rememberPersistConfig, rememberReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine reducers
const rootReducer = combineReducers({
  images: imageReducer,
  auth: persistedAuthReducer,
  remember: persistedRememberReducer,
  post: postReducer,
  product: productReducer,
  cart: persistedCartReducer,
});

// Create a persist config for the root reducer
const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'remember', 'cart'], // blacklist the already persisted reducers
};

// Create a persisted root reducer
const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedRootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor to manage the persistence
export const persistor = persistStore(store);

// Export the store
export default store;

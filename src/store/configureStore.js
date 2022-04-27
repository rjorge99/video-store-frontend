import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './storeSlice';

export default configureStore({
    reducer: videoReducer
});

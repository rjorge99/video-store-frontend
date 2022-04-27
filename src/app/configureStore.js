import { configureStore } from '@reduxjs/toolkit';
import reducer from './storeSlice';

export default configureStore({
    reducer
});

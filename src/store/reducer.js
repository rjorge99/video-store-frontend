import { combineReducers } from '@reduxjs/toolkit';
import videoStore from './storeSlice';

export default combineReducers({
    entities: videoStore
});

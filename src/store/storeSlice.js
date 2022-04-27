import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'videoStore',
    initialValues: {
        movies: [],
        currentUser: null
    },
    reducers: {
        moviesLoaded: (state, action) => {
            state.movie = action.payload;
        }
    }
});

export const { moviesLoaded } = storeSlice.actions;
export default storeSlice.reducer;

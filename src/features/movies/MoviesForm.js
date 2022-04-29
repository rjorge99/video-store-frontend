import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovie } from '../../app/storeSlice';

export const MoviesForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loadedMovie } = useSelector((state) => state.movies);

    useEffect(() => {
        if (id === 'new') return;

        dispatch(getMovie(id));
        console.log(loadedMovie);
    }, [id]);

    return <div>{JSON.stringify(loadedMovie, null, 3)}</div>;
};

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moviesService from '../../services/moviesService';

export const MoviesForm = () => {
    const [movie, setMovie] = useState({
        title: '',
        genreId: '',
        numberInStock: '',
        dailyRentalRate: ''
    });
    const { genres } = useSelector((state) => state);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id === 'new') return;

        async function loadData() {
            try {
                const { data } = await moviesService.getMovie(id);
                setMovie(data);
            } catch (error) {
                if (error.response.status === 404) navigate('/movies', { replace: true });
            }
        }

        loadData();
    }, [id]);

    return (
        <>
            <div>{JSON.stringify(movie, null, 3)}</div>
            <div>{JSON.stringify(genres, null, 3)}</div>
        </>
    );
};

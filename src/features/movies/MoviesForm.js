import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moviesService from '../../services/moviesService';
import { Form, Formik } from 'formik';
import { MyTextInput } from '../../commons/components/Formik/MyTextInput';
import { MySelect } from '../../commons/components/Formik/MySelect';
import { saveMovie } from '../../app/storeSlice';

export const MoviesForm = () => {
    const dispatch = useDispatch();
    const [movie, setMovie] = useState({
        title: '',
        genreId: '',
        numberInStock: '',
        dailyRentalRate: ''
    });
    const { list: genres } = useSelector((state) => state.genres);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id === 'new') return;

        async function loadData() {
            try {
                const { data } = await moviesService.getMovie(id);
                setMovie(mapToViewModel(data));
            } catch (error) {
                if (error.response.status === 404) navigate('/movies', { replace: true });
            }
        }

        loadData();
    }, [id]);

    const mapToViewModel = useCallback((movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }, []);

    useCallback((movie) => []);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={movie}
                validationSchema={Yup.object({
                    title: Yup.string().min(5).max(200).required().label('Title'),
                    genreId: Yup.string().min(1).max(100).required().label('Genre'),
                    numberInStock: Yup.number().min(2).max(25).required().label('Number in Stock'),
                    dailyRentalRate: Yup.number()
                        .min(1)
                        .max(10)
                        .required()
                        .label('Daily rental rate')
                })}
                onSubmit={(formData) => {
                    dispatch(saveMovie(formData));
                }}>
                {({ isSubmitting }) => (
                    <>
                        <h1>Movie</h1>
                        <Form>
                            <MyTextInput
                                label='Title'
                                name='title'
                                type='text'
                                placeholder='Title'
                            />
                            <MySelect label='Genre' name='genreId'>
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </MySelect>
                            <MyTextInput
                                label='Number in Stock'
                                name='numberInStock'
                                type='text'
                                placeholder='Number in Stock'
                            />
                            <MyTextInput
                                label='Daily rental rate'
                                name='dailyRentalRate'
                                type='text'
                                placeholder='Daily Rental Rate'
                            />
                            <button className='btn btn-primary' type='submit'>
                                Submit
                            </button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
};

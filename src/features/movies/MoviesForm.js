import { useParams } from 'react-router-dom';

export const MoviesForm = () => {
    const { id } = useParams();

    return <div>{id}</div>;
};

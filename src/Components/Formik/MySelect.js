import { useField, ErrorMessage } from 'formik';

export const MySelect = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
        <>
            <div className='mb-3'>
                <label htmlFor='props.id || props.name' className='form-label'>
                    {label}
                </label>
                <select className='form-control' {...props} {...field} />
                <ErrorMessage name={props.name} component='div' className='alert alert-danger' />
            </div>
        </>
    );
};

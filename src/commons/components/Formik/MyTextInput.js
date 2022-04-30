import { useField, ErrorMessage } from 'formik';

export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className='mb-3'>
                <label htmlFor='props.id || props.name' className='form-label'>
                    {label}
                </label>
                <input className='form-control' {...field} {...props} />
                <ErrorMessage name={props.name} component='div' className='alert alert-danger' />
            </div>
        </>
    );
};

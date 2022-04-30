import authService from '../services/authService';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const Login = () => {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string().min(5).max(20).required().label('Username'),
                password: Yup.string().min(5).max(20).required().label('Password')
            })}
            onSubmit={async (formData) => {
                try {
                    await authService.login(formData.username, formData.password);
                    window.location = '/'; //TODO: Buscar otra manera, actualmene se usa de esta manera para establece el token, posible uso de action creators ?
                } catch (error) {
                    if (error.response.status === 400) toast.error(error.response.data);
                }
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>
                            Username
                        </label>
                        <Field className='form-control' id='username' type='text' name='username' />
                        <ErrorMessage
                            name='username'
                            component='div'
                            className='alert alert-danger'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            Password
                        </label>
                        <Field
                            className='form-control'
                            id='password'
                            type='password'
                            name='password'
                        />
                        <ErrorMessage
                            name='password'
                            component='div'
                            className='alert alert-danger'
                        />
                    </div>
                    <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

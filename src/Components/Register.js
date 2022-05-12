import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../app/storeSlice';
import { MyTextInput } from './Formik/MyTextInput';

export const Register = () => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string().min(5).max(20).required().label('Username'),
                email: Yup.string().email().required().label('Email'),
                password: Yup.string().min(5).max(20).required().label('Password')
            })}
            onSubmit={async (formData) => {
                dispatch(register(formData));
            }}>
            {({ isSubmitting }) => (
                <div>
                    <h1>Register</h1>
                    <Form>
                        <MyTextInput
                            label='Username'
                            name='username'
                            type='text'
                            placeholder='Username'
                        />
                        <MyTextInput label='Email' name='email' type='email' placeholder='Email' />
                        <MyTextInput
                            label='Password'
                            name='password'
                            type='text'
                            placeholder='Password'
                        />
                        <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

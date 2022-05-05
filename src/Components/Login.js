import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { MyTextInput } from '../commons/components/Formik/MyTextInput';
import { login } from '../app/storeSlice';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string().min(5).max(20).required().label('Username'),
                password: Yup.string().min(5).max(20).required().label('Password')
            })}
            onSubmit={async (formData) => {
                dispatch(login(formData));
            }}>
            {({ isSubmitting }) => (
                <div>
                    <h1>Login</h1>
                    <Form>
                        <MyTextInput
                            label='Username'
                            name='username'
                            type='text'
                            placeholder='Username'
                        />
                        <MyTextInput
                            label='Password'
                            name='password'
                            type='password'
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

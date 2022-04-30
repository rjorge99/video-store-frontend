import authService from '../services/authService';
import userService from '../services/userService';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MyTextInput } from '../commons/components/Formik/MyTextInput';

export const Register = () => {
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string().min(5).max(20).required().label('Username'),
                email: Yup.string().email().required().label('Email'),
                password: Yup.string().min(5).max(20).required().label('Password')
            })}
            onSubmit={async (formData) => {
                try {
                    const response = await userService.register(
                        formData.username,
                        formData.email,
                        formData.password
                    );
                    authService.loginWithJwt(response.headers['x-auth-token']);
                    window.location = '/'; //TODO: Buscar otra manera, actualmene se usa de esta manera para establece el token, posible uso de action creators ?
                } catch (error) {
                    if (error.response.status === 400) toast.error(error.response.data);
                }
            }}>
            {({ isSubmitting }) => (
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
            )}
        </Formik>
    );
};

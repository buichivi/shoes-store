import request from '../utils/request';
import { checkLogin, logIn, logOut } from './userSlice';
import { toast } from 'react-toastify';

export const logInUser = (values, navigate) => async (dispatch) => {
    request
        .get('/login', {
            params: {
                email: values.email,
                password: values.password,
                remember: values.remember,
            },
        })
        .then((res) => {
            dispatch(logIn(res.data));
            navigate('/');
            setTimeout(() => {
                toast.success('Logged in successfully!');
            }, 500);
        })
        .catch((err) => {
            toast.error(err?.response?.data?.message || 'Login failed!');
        });
};

export const logOutUser = () => async (dispatch) => {
    request
        .get('/logout')
        .then(() => {
            localStorage.setItem('isAuthenticated', false);
            dispatch(logOut());
            toast.success('Log out successfully!');
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
};

export const checkingLoginUser = () => async (dispatch) => {
    request
        .get('/checking-login')
        .then((res) => {
            dispatch(checkLogin(res.data));
            console.log(res.data.current_user);
        })
        .catch((err) => {
            console.log(err);
            localStorage.setItem('isAuthenticated', false);
        });
};

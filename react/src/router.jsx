import { Navigate, createBrowserRouter } from 'react-router-dom';
import GuestLayout from './Layouts/GuestLayout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LoggedLayout from './Layouts/LoggedLayout';
import Users from './Pages/Users';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/Dashboard';
import UserForm from './Pages/UserForm';
import Orders from './Pages/Orders';
import OrderForm from './Pages/OrderForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoggedLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />,
            },
            {
                path: '/users/1',
                element: <Navigate to="/users" />,
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/orders/new',
                element: <OrderForm key="orderCreate" />,
            },
            {
                path: '/orders/:id',
                element: <OrderForm key="orderUpdate" />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
        ],
    },

    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;

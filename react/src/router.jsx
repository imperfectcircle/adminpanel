import { Navigate, createBrowserRouter } from 'react-router-dom';
import GuestLayout from './Layouts/GuestLayout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LoggedLayout from './Layouts/LoggedLayout';
import Users from './Pages/Users';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/Dashboard';

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

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
import OrderDetail from './Pages/OrderDetail';
import OrderForm from './Pages/OrderForm';
import Comics from './Pages/Comics';
import ComicsForm from './Pages/ComicsForm';
import ComicDetail from './Pages/ComicDetail';
import Authors from './Pages/Authors';
import AuthorsForm from './Pages/AuthorsForm';
import AuthorDetail from './Pages/AuthorDetail';

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
                path: '/orders/detail/:id',
                element: <OrderDetail />,
            },
            {
                path: '/orders/new',
                element: <OrderForm key="orderCreate" />,
            },
            {
                path: '/orders/:id',
                element: <OrderForm key="orderUpdate" />,
            },
            {
                path: '/comics',
                element: <Comics />,
            },
            {
                path: '/comics/new',
                element: <ComicsForm key="comicCreate" />,
            },
            {
                path: '/comics/:id',
                element: <ComicsForm key="comicUpdate" />,
            },
            {
                path: '/comics/detail/:id',
                element: <ComicDetail />,
            },
            {
                path: '/authors',
                element: <Authors />,
            },
            {
                path: '/authors/new',
                element: <AuthorsForm key="authorCreate" />,
            },
            {
                path: '/authors/:id',
                element: <AuthorsForm key="authorUpdate" />,
            },
            {
                path: '/authors/detail/:id',
                element: <AuthorDetail />,
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

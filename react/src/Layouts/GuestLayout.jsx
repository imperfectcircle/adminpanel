import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <section className="grid h-screen place-items-center bg-gray-100">
            <div className="h-fit  rounded-md bg-white p-10 shadow-lg md:w-1/3">
                <Outlet />
            </div>
        </section>
    );
}

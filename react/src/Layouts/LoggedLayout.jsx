import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { HiUserCircle, HiChartPie, HiUser } from 'react-icons/hi';
import { motion } from 'framer-motion';
import axiosClient from '../axios-client';

export default function LoggedLayout() {
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        });
    }, []);

    const [userIsVisible, setUserIsVisible] = useState(false);
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (event) => {
        event.preventDefault();

        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        });
    };

    const handleUserVisibility = () => {
        setUserIsVisible(!userIsVisible);
    };

    const handleMenuVisibility = () => {
        setMenuIsVisible(!menuIsVisible);
    };

    return (
        <section className="min-h-screen">
            <header className="fixed z-10 flex min-h-[60px] w-full items-center justify-between bg-sky-400 p-5 shadow-lg">
                <p className="text-2xl font-bold text-white">
                    Pannello di Gestione
                </p>
                <div className="relative">
                    <HiUserCircle
                        onClick={handleMenuVisibility}
                        className="h-10 w-10 text-white"
                    />
                    <motion.div
                        className={`absolute -right-0 top-10 w-[200px] rounded-lg bg-gray-200 p-5 shadow-lg ${
                            menuIsVisible ? 'block' : 'hidden'
                        }`}
                        key={menuIsVisible}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="pb-3 text-red-700 first-letter:uppercase">
                            {user.name}
                        </p>

                        <Link onClick={onLogout} to="/logout">
                            Logout
                        </Link>
                    </motion.div>
                </div>
            </header>
            <div className="fixed top-[60px] grid h-screen w-full grid-cols-5 ">
                <aside className=" min-w-[256px] bg-sky-400 pt-16 text-xl  text-white shadow-lg shadow-black">
                    <div className="space-y-3">
                        <Link
                            className="flex items-center pl-10"
                            onClick={() => setUserIsVisible(false)}
                            to="/dashboard"
                        >
                            <HiChartPie className="mr-3" />
                            Dashboard
                        </Link>

                        <div className="">
                            <div className="flex items-center space-x-3 pl-10">
                                <HiUser />
                                <p
                                    className="cursor-pointer"
                                    onClick={handleUserVisibility}
                                >
                                    Utenti
                                </p>
                            </div>
                            <motion.div
                                className={`flex w-full flex-col bg-gray-100 p-3 pl-12 ${
                                    userIsVisible ? 'block' : 'hidden'
                                }`}
                                key={userIsVisible}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link
                                    className="text-lg text-black transition-all duration-150 hover:text-red-500"
                                    to="/users"
                                >
                                    Lista Utenti
                                </Link>
                                <Link
                                    className="text-lg text-black transition-all duration-150 hover:text-red-500"
                                    to="#"
                                >
                                    Crea Nuovo Utente
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </aside>
                <main className="col-span-4 p-10">
                    <Outlet />
                </main>
            </div>
        </section>
    );
}

import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { HiUserCircle, HiChartPie, HiUser } from 'react-icons/hi';
import { AiOutlineUnorderedList, AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { ImSwitch } from 'react-icons/im';
import { AnimatePresence, motion } from 'framer-motion';
import axiosClient from '../axios-client';

export default function LoggedLayout() {
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        });
    }, []);

    const [userIsVisible, setUserIsVisible] = useState(false);
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const { user, token, notification, setUser, setToken } = useStateContext();

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
                    <AnimatePresence>
                        {menuIsVisible && (
                            <motion.div
                                className="absolute -right-0 top-10 w-[200px] rounded-lg bg-gray-200 p-5 shadow-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="pb-3 text-red-700 first-letter:uppercase">
                                    {user.name}
                                </p>

                                <Link
                                    className="flex items-center transition-all duration-150 hover:text-red-500"
                                    onClick={onLogout}
                                    to="/logout"
                                >
                                    <ImSwitch className="mr-3" />
                                    Logout
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>
            <div className="grid h-screen w-full grid-cols-3 pt-[60px] md:grid-cols-5 ">
                <aside className="min-w-fit bg-sky-400 pt-16 text-xl  text-white shadow-lg shadow-black">
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
                                    <div className="flex items-center">
                                        Utenti
                                        {userIsVisible && (
                                            <RiArrowUpSLine className="ml-3" />
                                        )}
                                        {!userIsVisible && (
                                            <RiArrowDownSLine className="ml-3" />
                                        )}
                                    </div>
                                </p>
                            </div>
                            <AnimatePresence>
                                {userIsVisible && (
                                    <motion.div
                                        className="flex w-full flex-col bg-gray-100 p-3 pl-12"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Link
                                            className="flex items-center text-lg text-black transition-all duration-150 hover:text-red-500"
                                            to="/users"
                                        >
                                            <AiOutlineUnorderedList className="mr-3" />
                                            Lista Utenti
                                        </Link>
                                        <Link
                                            className="flex items-center text-lg text-black transition-all duration-150 hover:text-red-500"
                                            to="/users/new"
                                        >
                                            <AiOutlinePlus className="mr-3" />
                                            Crea Nuovo Utente
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </aside>
                <main className="col-span-2 p-10 md:col-span-4">
                    <Outlet />
                    <AnimatePresence>
                        {notification && (
                            <motion.div
                                className="fixed right-4 top-4 z-50 rounded-lg bg-emerald-500 p-5 text-white shadow-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-lg">{notification}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </section>
    );
}

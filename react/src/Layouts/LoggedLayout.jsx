/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { HiUserCircle, HiChartPie, HiUser } from 'react-icons/hi';
import { ImSwitch } from 'react-icons/im';
import { BsFillInboxFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import axiosClient from '../axios-client';
import Dropdown from '../Components/Dropdown';
import { useMenuVisibility } from '../Hooks/useMenuVisibility';
import { useLogoutPopup } from '../Hooks/useLogoutPopup';

export default function LoggedLayout() {
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        });
    }, []);

    const [resetVisibility] = useMenuVisibility();
    const [popupIsVisible, togglePopupVisibility] = useLogoutPopup();
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

    return (
        <section className="min-h-screen">
            <header className="fixed z-10 flex min-h-[60px] w-full items-center justify-between bg-sky-400 p-5 shadow-lg">
                <p className="text-2xl font-bold text-white">
                    Pannello di Gestione
                </p>
                <div className="relative">
                    <HiUserCircle
                        onClick={togglePopupVisibility}
                        className="h-10 w-10 text-white"
                    />
                    <AnimatePresence>
                        {popupIsVisible && (
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
                    <div className="sticky top-10 space-y-3">
                        <Link
                            className="flex items-center pl-10"
                            onClick={resetVisibility}
                            to="/dashboard"
                        >
                            <HiChartPie className="mr-3" />
                            Dashboard
                        </Link>

                        <Dropdown
                            icon={HiUser}
                            menuName="Utenti"
                            linkList="/users"
                            listName="Lista Utenti"
                            linkNew="/users/new"
                            newName="Crea Nuovo Utente"
                        />

                        <Dropdown
                            icon={BsFillInboxFill}
                            menuName="Ordini"
                            linkList="#"
                            listName="Lista Ordini"
                            linkNew="#"
                            newName="Crea Nuovo Ordine"
                        />
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

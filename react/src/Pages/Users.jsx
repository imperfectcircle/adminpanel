import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { Helmet } from 'react-helmet-async';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient('/users')
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDelete = (user) => {
        if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) {
            return;
        }

        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification("L'utente è stato eliminato.");
            getUsers();
        });
    };

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Lista Utenti</title>
            </Helmet>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Utenti</h1>
                </div>
                <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                    <table className="w-full border-separate border-spacing-4">
                        <thead className="bg-gray-200">
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Nome Utente</th>
                                <th>Email</th>
                                <th>Creato il</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <p className="text-lg">
                                            Caricamento...
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && (
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        className="border-b-2 text-center"
                                        key={user.id}
                                    >
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-6 py-3 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/users/' + user.id}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={(event) =>
                                                    onDelete(user)
                                                }
                                            >
                                                Elimina
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
}

import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { Helmet } from 'react-helmet-async';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDelete = (user) => {
        if (!window.confirm(`Stai per eliminare l'utente ${user.name}`)) {
            return;
        }

        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification(
                `L'utente ${user.name} è stato eliminato correttamente.`,
            );
            getUsers();
        });
    };

    const handleInput = (event) => {
        const lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = users.filter((user) => {
        if (inputText === '') {
            return user;
        } else {
            return (
                user.name.toLowerCase().includes(inputText) ||
                user.email.toLowerCase().includes(inputText)
            );
        }
    });

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Lista Utenti</title>
            </Helmet>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Utenti</h1>
                </div>
                <div className="my-5 text-center">
                    <input
                        className={`w-1/3 rounded-md shadow-lg ${
                            filteredData.length === 0
                                ? 'focus:bg-red-200'
                                : 'focus:bg-emerald-100'
                        }`}
                        type="text"
                        name=""
                        id=""
                        placeholder="Cerca per Nome Utente o Email"
                        onChange={handleInput}
                    />
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
                        {inputText && (
                            <tbody>
                                {filteredData.map((el) => (
                                    <tr className="text-center" key={el.id}>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.email}</td>
                                        <td>{el.created_at}</td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-6 py-3 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/users/' + el.id}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={() => onDelete(el)}
                                            >
                                                Elimina
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <p className="text-lg">
                                                Utente non trovato
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}

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
                        {!inputText && !loading && (
                            <tbody>
                                {users.map((user) => (
                                    <tr className="text-center" key={user.id}>
                                        <td>{user.id}</td>
                                        <td className="first-letter:uppercase">
                                            {user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/users/' + user.id}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={() => onDelete(user)}
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

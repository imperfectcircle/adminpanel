/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

//TODO check visivi password

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';
import { Helmet } from 'react-helmet-async';

import PasswordInput from '../Components/PasswordInput';
import InputField from '../Components/InputField';
import { onSubmit } from '../Utilities/onSubmit';

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const updateText = `L'utente ${user.name} è stato modificato correttamente.`;
    const createText = `L'utente ${user.name} è stato creato.`;
    const uri = '/users/';

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const handleSubmit = onSubmit(
        user,
        setNotification,
        navigate,
        setErrors,
        uri,
        updateText,
        createText,
    );

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     if (user.id) {
    //         axiosClient
    //             .put(`/users/${user.id}`, user)
    //             .then(() => {
    //                 setNotification(
    //                     `L'utente ${user.name} è stato modificato correttamente.`,
    //                 );
    //                 navigate('/users');
    //             })
    //             .catch((error) => {
    //                 const response = error.response;
    //                 if (response && response.status === 422) {
    //                     setErrors(response.data.errors);
    //                 }
    //             });
    //     } else {
    //         axiosClient
    //             .post(`/users/`, user)
    //             .then(() => {
    //                 setNotification(`L'utente ${user.name} è stato creato.`);
    //                 navigate('/users');
    //             })
    //             .catch((error) => {
    //                 const response = error.response;
    //                 if (response && response.status === 422) {
    //                     setErrors(response.data.errors);
    //                 }
    //             });
    //     }
    // };

    return (
        <>
            {user.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Modifica Utente</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Stai modificando l&apos;utente: {user.name}
                    </h1>
                </>
            )}
            {!user.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Crea Utente</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Nuovo utente
                    </h1>
                </>
            )}

            {errors && (
                <div className="my-3 rounded-lg bg-red-500 p-5 text-white">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            {loading && (
                <div className="p-5 text-center">
                    <p className="text-lg">Caricamento...</p>
                </div>
            )}
            {!loading && (
                <form
                    className="mt-5 flex flex-col space-y-5 rounded-lg bg-white p-10 shadow-lg"
                    onSubmit={handleSubmit}
                    action=""
                >
                    <InputField
                        content="Nome Utente"
                        value={user.name}
                        onChange={(ev) =>
                            setUser({
                                ...user,
                                name: ev.target.value,
                            })
                        }
                        type="text"
                        field="username"
                        autoComplete="username"
                    />
                    <InputField
                        content="Indirizzo Email"
                        value={user.email}
                        onChange={(ev) =>
                            setUser({
                                ...user,
                                email: ev.target.value,
                            })
                        }
                        type="email"
                        field="email"
                        autoComplete="email"
                    />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Password</label>
                        <PasswordInput
                            handleChange={(ev) =>
                                setUser({
                                    ...user,
                                    password: ev.target.value,
                                })
                            }
                            autoComplete="new-password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password_confirmation">
                            Conferma Password
                        </label>
                        <PasswordInput
                            handleChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            autoComplete="new-password"
                            placeholder="Conferma Password"
                        />
                    </div>
                    <button className="mx-auto w-1/3 rounded-lg bg-emerald-500 py-3 font-bold text-white shadow-md duration-150 hover:bg-emerald-600">
                        {id ? 'Modifica Utente' : 'Crea Utente'}
                    </button>
                </form>
            )}
        </>
    );
}

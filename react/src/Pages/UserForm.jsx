import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';
import { Helmet } from 'react-helmet-async';

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [passwordConfirmationIsVisible, setPasswordConfirmationIsVisible] =
        useState(false);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    if (id) {
        useEffect(() => {
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
        }, []);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("L'utente è stato modificato.");
                    navigate('/users');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users/`, user)
                .then(() => {
                    setNotification("L'utente è stato creato.");
                    navigate('/users');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handelPasswordVisibility = () => {
        setPasswordIsVisible(!passwordIsVisible);
    };

    const handelPasswordConfirmationVisibility = () => {
        setPasswordConfirmationIsVisible(!passwordConfirmationIsVisible);
    };

    return (
        <>
            {user.id && (
                <Helmet>
                    <title>Pannello di gestione | Modifica Utente</title>
                </Helmet>
            )}
            {!user.id && (
                <Helmet>
                    <title>Pannello di gestione | Crea Utente</title>
                </Helmet>
            )}
            {user.id && (
                <h1 className="text-center text-4xl font-bold">
                    Stai modificando l&apos;utente: {user.name}
                </h1>
            )}
            {!user.id && (
                <h1 className="text-center text-4xl font-bold">Nuovo utente</h1>
            )}
            {errors && (
                <div className="my-3 rounded-lg bg-red-500 p-5 text-white">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            {!loading && (
                <form
                    className="mt-5 flex flex-col space-y-5 rounded-lg bg-white p-10 shadow-lg"
                    onSubmit={onSubmit}
                    action=""
                >
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username">Nome Utente</label>

                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            className="rounded-md shadow-lg focus:bg-emerald-100"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Nome Utente"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email">Indirizzo Email</label>
                        <input
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            className="rounded-md shadow-lg focus:bg-emerald-100"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Indirizzo Email"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Password</label>
                        <div className="relative flex">
                            <input
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                className="w-full rounded-md shadow-lg focus:bg-emerald-100"
                                type={passwordIsVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Password"
                            />
                            {!passwordIsVisible && (
                                <AiOutlineEye
                                    onClick={handelPasswordVisibility}
                                    className="absolute right-[4%] top-[28%] cursor-pointer"
                                />
                            )}
                            {passwordIsVisible && (
                                <AiOutlineEyeInvisible
                                    onClick={handelPasswordVisibility}
                                    className="absolute right-[4%] top-[28%] cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password_confirmation">
                            Conferma Password
                        </label>
                        <div className="relative flex">
                            <input
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password_confirmation: ev.target.value,
                                    })
                                }
                                className="w-full rounded-md shadow-lg focus:bg-emerald-100"
                                type={
                                    passwordConfirmationIsVisible
                                        ? 'text'
                                        : 'password'
                                }
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder="Conferma Password"
                            />
                            {!passwordConfirmationIsVisible && (
                                <AiOutlineEye
                                    onClick={
                                        handelPasswordConfirmationVisibility
                                    }
                                    className="absolute right-[4%] top-[28%] cursor-pointer"
                                />
                            )}
                            {passwordConfirmationIsVisible && (
                                <AiOutlineEyeInvisible
                                    onClick={
                                        handelPasswordConfirmationVisibility
                                    }
                                    className="absolute right-[4%] top-[28%] cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <button className="mx-auto w-1/3 rounded-lg bg-emerald-500 py-3 font-bold text-white shadow-md duration-150 hover:bg-emerald-600">
                        {user.id && 'Modifica Utente'}
                        {!user.id && 'Crea Utente'}
                    </button>
                </form>
            )}
        </>
    );
}

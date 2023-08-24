import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';
import { usePasswordVisibility } from '../Hooks/usePasswordVisibility';
import PasswordInput from '../Components/PasswordInput';
import EyeIcon from '../Components/EyeIcon';

export default function Login() {
    const nameRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const [passwordIsVisible, togglePasswordVisibility] =
        usePasswordVisibility();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <>
            {errors && (
                <div className="mb-3 rounded-lg bg-red-500 p-5 text-white">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <form
                className="flex flex-col space-y-10"
                onSubmit={onSubmit}
                action=""
            >
                <h1 className="text-center text-2xl font-bold">
                    Accedi al Pannello di Gestione
                </h1>
                <input
                    ref={nameRef}
                    className="rounded-md shadow-lg focus:bg-emerald-100"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="username"
                    placeholder="Nome Utente"
                />

                <div className="relative flex">
                    <input
                        ref={passwordRef}
                        className="w-full rounded-md shadow-lg focus:bg-emerald-100"
                        type={passwordIsVisible ? 'text' : 'password'}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="Password"
                    />
                    <EyeIcon
                        passwordIsVisible={passwordIsVisible}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </div>
                <button className="mx-auto w-1/3 rounded-lg bg-sky-300 py-3 font-bold text-white shadow-md duration-150 hover:bg-sky-400">
                    Accedi
                </button>
            </form>
        </>
    );
}

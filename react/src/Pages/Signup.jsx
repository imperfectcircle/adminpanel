import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    console.log(import.meta.env.VITE_API_BASE_URL);

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
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
                <input
                    ref={nameRef}
                    className="rounded-md shadow-lg focus:bg-emerald-100"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nome Utente"
                />
                <input
                    ref={emailRef}
                    className="rounded-md shadow-lg focus:bg-emerald-100"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Indirizzo Email"
                />
                <input
                    ref={passwordRef}
                    className="rounded-md shadow-lg focus:bg-emerald-100"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
                <input
                    ref={passwordConfirmationRef}
                    className="rounded-md shadow-lg focus:bg-emerald-100"
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Conferma Password"
                />
                <button className="mx-auto w-1/3 rounded-lg bg-sky-300 py-3 font-bold text-white shadow-md duration-150 hover:bg-sky-400">
                    Registrati
                </button>
            </form>
        </>
    );
}

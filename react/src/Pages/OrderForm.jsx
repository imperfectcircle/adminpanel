import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';

export default function OrderForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [order, setOrder] = useState({
        id: null,
        customer: '',
        email: '',
        amount: '',
        state: '',
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/orders/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setOrder(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        if (order.id) {
            axiosClient
                .put(`/orders/${order.id}`, order)
                .then(() => {
                    setNotification(
                        `L'ordine numero ${order.id} è stato modificato correttamente.`,
                    );
                    navigate('/orders');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/orders/`, order)
                .then(() => {
                    setNotification(
                        `L'ordine numero ${order.id} è stato creato.`,
                    );
                    navigate('/orders');
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {order.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Modifica Ordine</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Stai modificando l&apos;ordine numero: {order.id}
                    </h1>
                </>
            )}
            {!order.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Crea Ordine</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Nuovo Ordine
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
                    onSubmit={onSubmit}
                    action=""
                >
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="customer">Cliente</label>

                        <input
                            value={order.customer}
                            onChange={(ev) =>
                                setOrder({
                                    ...order,
                                    customer: ev.target.value,
                                })
                            }
                            className="rounded-md shadow-lg focus:bg-emerald-100"
                            type="text"
                            name="customer"
                            id="customer"
                            autoComplete="customer"
                            placeholder="Cliente"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email">Indirizzo Email</label>
                        <input
                            value={order.email}
                            onChange={(ev) =>
                                setOrder({ ...order, email: ev.target.value })
                            }
                            className="rounded-md shadow-lg focus:bg-emerald-100"
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="Indirizzo Email"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="amount">Totale</label>
                        <input
                            value={order.amount}
                            onChange={(ev) =>
                                setOrder({ ...order, amount: +ev.target.value })
                            }
                            className="rounded-md shadow-lg focus:bg-emerald-100"
                            type="number"
                            name="amount"
                            id="amount"
                            autoComplete="amount"
                            placeholder="Totale Ordine"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="state"
                            id="pagato"
                            value="pagato"
                            onChange={(ev) =>
                                setOrder({ ...order, state: ev.target.value })
                            }
                        />
                        <label htmlFor="pagato">Pagato</label>
                        <input
                            type="radio"
                            name="state"
                            id="non pagato"
                            value="non pagato"
                            onChange={(ev) =>
                                setOrder({ ...order, state: ev.target.value })
                            }
                        />
                        <label htmlFor="non pagato">Non Pagato</label>
                    </div>
                    <button className="mx-auto w-1/3 rounded-lg bg-emerald-500 py-3 font-bold text-white shadow-md duration-150 hover:bg-emerald-600">
                        {id ? 'Modifica Ordine' : 'Crea Ordine'}
                    </button>
                </form>
            )}
        </>
    );
}

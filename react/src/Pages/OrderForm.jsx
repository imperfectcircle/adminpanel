import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';
import InputField from '../Components/InputField';
import { onSubmit } from '../Utilities/onSubmit';

export default function OrderForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [order, setOrder] = useState({
        id: null,
        first_name: '',
        last_name: '',
        order_items: '',
        email: '',
        amount: '',
        state: '',
    });

    const uri = '/orders/';
    const updateText = `L'ordine numero ${order.id} è stato modificato correttamente.`;
    const createText = `L'ordine numero ${order.id} è stato creato.`;

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

    const handleSubmit = onSubmit(
        order,
        setNotification,
        navigate,
        setErrors,
        uri,
        updateText,
        createText,
    );

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     if (order.id) {
    //         axiosClient
    //             .put(`/orders/${order.id}`, order)
    //             .then(() => {
    //                 setNotification(
    //                     `L'ordine numero ${order.id} è stato modificato correttamente.`,
    //                 );
    //                 navigate('/orders');
    //             })
    //             .catch((error) => {
    //                 const response = error.response;
    //                 if (response && response.status === 422) {
    //                     setErrors(response.data.errors);
    //                 }
    //             });
    //     } else {
    //         axiosClient
    //             .post(`/orders/`, order)
    //             .then(() => {
    //                 setNotification(
    //                     `L'ordine numero ${order.id} è stato creato.`,
    //                 );
    //                 navigate('/orders');
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
                    onSubmit={handleSubmit}
                    action=""
                >
                    <InputField
                        content="Nome"
                        value={order.first_name}
                        onChange={(ev) =>
                            setOrder({
                                ...order,
                                first_name: ev.target.value,
                            })
                        }
                        type="text"
                        field="first_name"
                        autoComplete="given-name"
                    />
                    <InputField
                        content="Cognome"
                        value={order.last_name}
                        onChange={(ev) =>
                            setOrder({
                                ...order,
                                last_name: ev.target.value,
                            })
                        }
                        type="text"
                        field="last_name"
                        autoComplete="family-name"
                    />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="order_items">
                            Ordine (Separa gli elementi con il ; )
                        </label>
                        <textarea
                            rows="10"
                            className="resize-none rounded-md shadow-lg focus:bg-emerald-100"
                            name="order_items"
                            id="order_items"
                            placeholder="Ordine"
                            onChange={(ev) =>
                                setOrder({
                                    ...order,
                                    order_items: ev.target.value,
                                })
                            }
                        >
                            {order.order_items}
                        </textarea>
                    </div>
                    <InputField
                        content="Indirizzo Email"
                        value={order.email}
                        onChange={(ev) =>
                            setOrder({
                                ...order,
                                email: ev.target.value,
                            })
                        }
                        type="email"
                        field="email"
                        autoComplete="email"
                    />
                    <InputField
                        content="Totale"
                        value={order.amount}
                        onChange={(ev) =>
                            setOrder({
                                ...order,
                                amount: +ev.target.value,
                            })
                        }
                        type="number"
                        field="amount"
                        autoComplete="off"
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="state"
                            id="pagato"
                            value="pagato"
                            checked
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

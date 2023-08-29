import { useState } from 'react';
import { useGetData } from '../Hooks/useGetData';
import { Helmet } from 'react-helmet-async';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';
import { Link } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const { setNotification } = useStateContext();

    const getData = useGetData('/orders', setLoading, setOrders);

    const onDelete = (order) => {
        if (!window.confirm(`Stai per eliminare l'ordine numero ${order.id}`)) {
            return;
        }

        axiosClient.delete(`/orders/${order.id}`).then(() => {
            setNotification(
                `L'ordine numero ${order.id} è stato eliminato correttamente.`,
            );
            getData();
        });
    };

    const handleInput = (event) => {
        const lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = orders.filter((order) => {
        if (inputText === '') {
            return order;
        } else {
            return (
                order.customer.toLowerCase().includes(inputText) ||
                order.email.toLowerCase().includes(inputText)
            );
        }
    });

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Lista Ordini</title>
            </Helmet>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Ordini</h1>
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
                        placeholder="Cerca per Cliente o Email"
                        onChange={handleInput}
                    />
                </div>

                <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                    <table className="w-full border-separate border-spacing-4">
                        <thead className="bg-gray-200">
                            <tr className="text-center">
                                <th>Data Ordine</th>
                                <th>Ordine n°</th>
                                <th>Cliente</th>
                                <th>Email</th>
                                <th>Totale €</th>
                                <th>Stato</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        {inputText && (
                            <tbody>
                                {filteredData.map((el) => (
                                    <tr className="text-center" key={el.id}>
                                        <td>{el.created_at}</td>
                                        <td>{el.id}</td>
                                        <td className="first-letter:uppercase">
                                            {el.customer}
                                        </td>
                                        <td>
                                            <a
                                                className="text-sky-600 underline"
                                                href={`mailto:${el.email}`}
                                            >
                                                {el.email}
                                            </a>
                                        </td>
                                        <td>{el.amount}</td>
                                        <td>{el.state}</td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/orders/' + el.id}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
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
                                                Ordine non trovato
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
                                {orders.map((order) => (
                                    <tr className="text-center" key={order.id}>
                                        <td>{order.created_at}</td>
                                        <td>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>
                                            <a
                                                className="text-sky-600 underline"
                                                href={`mailto:${order.email}`}
                                            >
                                                {order.email}
                                            </a>
                                        </td>
                                        <td>{order.amount}</td>
                                        <td className="px-2">
                                            <p
                                                className={
                                                    order.state === 'pagato'
                                                        ? 'bg-sky-400 px-2 py-1 text-white'
                                                        : 'bg-yellow-300 px-2 py-1'
                                                }
                                            >
                                                {order.state}
                                            </p>
                                        </td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/orders/' + order.id}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={() => onDelete(order)}
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

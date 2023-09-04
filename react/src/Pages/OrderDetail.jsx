import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';

export default function OrderDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (order.order_items) {
            const items = order.order_items.split(';');
            setOrderItems(items);
        }
    }, [order]);

    return (
        <>
            {order.id && (
                <>
                    <Helmet>
                        <title>{`Pannello di gestione | Dettaglio ordine n° ${order.id}`}</title>
                    </Helmet>
                    <h1 className="mb-5 text-center text-4xl">
                        Dettaglio ordine n° {order.id}
                    </h1>
                </>
            )}
            {loading && (
                <div className="p-5 text-center">
                    <p className="text-lg">Caricamento...</p>
                </div>
            )}
            {!loading && (
                <div className="space-y-5">
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Nome</p>
                        <p className="text-xl first-letter:uppercase">
                            {order.first_name}
                        </p>
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Cognome</p>
                        <p className="text-xl first-letter:uppercase">
                            {order.last_name}
                        </p>
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Email di contatto</p>
                        <a
                            href={`mailto:${order.email}`}
                            className="text-xl text-sky-600"
                        >
                            {order.email}
                        </a>
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Articoli ordine</p>
                        {orderItems.map((item, index) => (
                            <p
                                key={index}
                                className="text-xl first-letter:uppercase"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Totale</p>
                        <p className="text-xl first-letter:uppercase">
                            {order.amount} €
                        </p>
                    </div>
                    <div
                        className={`w-full space-y-2 rounded-lg p-5 shadow-lg ${
                            order.state === 'pagato'
                                ? 'bg-sky-400 text-white'
                                : 'bg-yellow-300 text-black'
                        }`}
                    >
                        <p>Stato</p>
                        <p className="text-xl first-letter:uppercase">
                            {order.state}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

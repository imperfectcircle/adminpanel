import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get('/dashboard')
            .then(({ data }) => {
                setLoading(false);
                setData(data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    function calculateTimeElapsed(targetDate) {
        const targetTime = new Date(targetDate);
        const currentTime = new Date();
        const timeDifference = currentTime - targetTime;
        const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursElapsed = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutesElapsed = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );

        let timeElapsedString = '';

        if (daysElapsed > 0) {
            timeElapsedString += `${daysElapsed} giorn${
                daysElapsed > 1 ? 'i' : 'o'
            } `;
        }

        if (hoursElapsed > 0) {
            timeElapsedString += `${hoursElapsed} or${
                hoursElapsed > 1 ? 'e' : 'a'
            } `;
        }

        if (minutesElapsed > 0) {
            timeElapsedString += `${minutesElapsed} minut${
                minutesElapsed > 1 ? 'i' : 'o'
            } `;
        }

        return timeElapsedString;
    }

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Dashboard</title>
            </Helmet>
            {loading && (
                <div className="p-5 text-center">
                    <p className="text-lg">Caricamento...</p>
                </div>
            )}
            {data && !loading && (
                <>
                    <div className="grid grid-cols-4 gap-5">
                        <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                            <p className="text-xl">Numero Utenti</p>
                            <p className="text-4xl">{data.countUsers}</p>
                        </div>
                        <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                            <p className="text-xl">Numero Ordini</p>
                            <p className="text-4xl">{data.countOrders}</p>
                        </div>
                        <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                            <p className="text-xl">Numero Autori</p>
                            <p className="text-4xl">{data.countAuthors}</p>
                        </div>
                        <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                            <p className="text-xl">Numero Manga</p>
                            <p className="text-4xl">{data.countComics}</p>
                        </div>
                        <div className="col-span-4 rounded-lg bg-gray-200 p-10 text-center shadow-md">
                            <div className="space-y-5">
                                <p className="text-xl font-bold ">
                                    Ultimi Ordini
                                </p>
                                {data.lastOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex space-x-2 text-xl"
                                    >
                                        <Link
                                            className="text-sky-600 underline"
                                            to={`/orders/detail/${order.id}`}
                                        >
                                            Ordine #{order.id}
                                        </Link>
                                        <p>
                                            {`Creato
                                            ${calculateTimeElapsed(
                                                order.created_at,
                                            )}
                                            fa`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';

export default function ComicDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [comic, setComic] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/comics/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setComic(data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {comic.id && (
                <>
                    <Helmet>
                        <title>{`Pannello di gestione | Dettaglio ${comic.title}`}</title>
                    </Helmet>
                    <h1 className="mb-5 text-center text-4xl">
                        Dettaglio {comic.title}
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
                        <p>Titolo</p>
                        <p className="text-xl first-letter:uppercase">
                            {comic.title}
                        </p>
                    </div>
                    {comic.author && (
                        <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                            <p>Autore</p>
                            <Link
                                to={`/authors/detail/${comic.author.id}`}
                                className="mr-3 text-xl text-sky-600 first-letter:uppercase"
                            >
                                {`${comic.author.first_name} ${comic.author.last_name}`}
                            </Link>
                        </div>
                    )}
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Sinossi</p>
                        <p className="text-xl first-letter:uppercase">
                            {comic.description}
                        </p>
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Anno</p>
                        <p className="text-xl first-letter:uppercase">
                            {comic.year}
                        </p>
                    </div>
                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Prezzo a volume</p>
                        <p className="text-xl first-letter:uppercase">
                            {comic.price} €
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

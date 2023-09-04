import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';

export default function AuthorDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/authors/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setAuthor(data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {author.id && (
                <>
                    <Helmet>
                        <title>{`Pannello di gestione | Dettaglio ${author.first_name} ${author.last_name}`}</title>
                    </Helmet>
                    <h1 className="mb-5 text-center text-4xl">
                        {`Dettaglio ${author.first_name} ${author.last_name}`}
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
                            {author.first_name}
                        </p>
                    </div>

                    <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                        <p>Cognome</p>
                        <p className="text-xl first-letter:uppercase">
                            {author.last_name}
                        </p>
                    </div>

                    {author.comics && (
                        <div className="flex w-full flex-col space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                            <p>Manga a catalogo</p>
                            {author.comics.map((comic) => (
                                <Link
                                    to={`/comics/detail/${comic.id}`}
                                    key={comic.id}
                                    className="mr-3 text-xl text-sky-600 first-letter:uppercase"
                                >
                                    {comic.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

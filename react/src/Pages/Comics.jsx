import { useState } from 'react';
import { useGetData } from '../Hooks/useGetData';
import { Helmet } from 'react-helmet-async';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';
import { Link } from 'react-router-dom';

export default function Comics() {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const { setNotification } = useStateContext();

    const getData = useGetData('/comics', setLoading, setComics);

    const onDelete = (comic) => {
        if (!window.confirm(`Stai per eliminare il manga ${comic.title}`)) {
            return;
        }

        axiosClient.delete(`/comics/${comic.id}`).then(() => {
            setNotification(
                `Il manga ${comic.title} è stato eliminato correttamente.`,
            );
            getData();
        });
    };

    const handleInput = (event) => {
        const lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = comics.filter((comic) => {
        if (inputText === '') {
            return comic;
        } else {
            const fullName =
                `${comic.author.first_name} ${comic.author.last_name}`.toLowerCase();
            const fullNameReverse =
                `${comic.author.last_name} ${comic.author.first_name}`.toLowerCase();
            return (
                comic.title.toLowerCase().includes(inputText) ||
                fullName.includes(inputText) ||
                fullNameReverse.includes(inputText)
            );
        }
    });

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Lista Manga</title>
            </Helmet>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Manga</h1>
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
                        placeholder="Cerca per Titolo o Autore"
                        onChange={handleInput}
                    />
                </div>

                <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                    <table className="w-full border-separate border-spacing-4">
                        <thead className="bg-gray-200">
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Titolo</th>
                                <th>Autore</th>
                                <th>Anno</th>
                                <th>Prezzo €</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        {inputText && (
                            <tbody>
                                {filteredData.map((el) => (
                                    <tr className="text-center" key={el.id}>
                                        <td>{el.id}</td>
                                        <td className="first-letter:uppercase">
                                            {el.title}
                                        </td>
                                        <td className="first-letter:uppercase">
                                            {`${el.author.first_name} ${el.author.last_name}`}
                                        </td>
                                        <td>{el.year}</td>
                                        <td>{el.price}</td>

                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/comics/' + el.id}
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
                                                Manga non trovato
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
                                {comics.map((comic) => (
                                    <tr className="text-center" key={comic.id}>
                                        <td>{comic.id}</td>
                                        <td>{comic.title}</td>
                                        <td className="first-letter:uppercase">
                                            {`${comic.author.first_name} ${comic.author.last_name}`}
                                        </td>
                                        <td>{comic.year}</td>
                                        <td>{comic.price}</td>

                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={`/comics/${comic.id}`}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={() => onDelete(comic)}
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

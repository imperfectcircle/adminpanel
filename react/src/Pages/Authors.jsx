import { useState } from 'react';
import { useStateContext } from '../Contexts/ContextProvider';
import { useGetData } from '../Hooks/useGetData';
import axiosClient from '../axios-client';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ComicsDropdown from '../Components/ComicsDropdown';

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const { setNotification } = useStateContext();

    const getAuthors = useGetData('/authors', setLoading, setAuthors);

    const onDelete = (author) => {
        if (
            !window.confirm(
                `Stai per eliminare l'autore ${author.first_name} ${author.last_name}. Verranno eliminate anche le relative opere dell'autore.`,
            )
        ) {
            return;
        }

        axiosClient.delete(`/authors/${author.id}`).then(() => {
            setNotification(
                `L'autore ${author.first_name} ${author.last_name} è stato eliminato correttamente.`,
            );
            getAuthors();
        });
    };

    const handleInput = (event) => {
        const lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = authors.filter((author) => {
        if (inputText === '') {
            return author;
        } else {
            const fullName =
                `${author.first_name} ${author.last_name}`.toLowerCase();
            const fullNameReverse =
                `${author.last_name} ${author.first_name}`.toLowerCase();
            return (
                fullName.includes(inputText) ||
                fullNameReverse.includes(inputText)
            );
        }
    });

    return (
        <>
            <Helmet>
                <title>Pannello di gestione | Lista Autori</title>
            </Helmet>
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Autori</h1>
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
                        placeholder="Cerca per Nome dell'autore"
                        onChange={handleInput}
                    />
                </div>

                <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                    <table className="w-full border-separate border-spacing-4">
                        <thead className="bg-gray-200">
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Opere</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        {inputText && (
                            <tbody>
                                {filteredData.map((el) => (
                                    <tr className="text-center" key={el.id}>
                                        <td>
                                            <Link
                                                className="text-sky-600"
                                                to={`/authors/detail/${el.id}`}
                                            >
                                                {el.id}
                                            </Link>
                                        </td>
                                        <td className="first-letter:uppercase">
                                            {el.first_name}
                                        </td>
                                        <td className="first-letter:uppercase">
                                            {el.last_name}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <ComicsDropdown
                                                    text="Opere"
                                                    author={el.comics}
                                                />
                                            </div>
                                        </td>

                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={'/authors/' + el.id}
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
                                                Autore non trovato
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
                                {authors.map((author) => (
                                    <tr className="text-center" key={author.id}>
                                        <td>
                                            <Link
                                                className="text-sky-600"
                                                to={`/authors/detail/${author.id}`}
                                            >
                                                {author.id}
                                            </Link>
                                        </td>
                                        <td className="first-letter:uppercase">
                                            {author.first_name}
                                        </td>
                                        <td className="first-letter:uppercase">
                                            {author.last_name}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <ComicsDropdown
                                                    text="Opere"
                                                    author={author.comics}
                                                />
                                            </div>
                                        </td>
                                        <td className="space-x-3 px-6 py-3">
                                            <Link
                                                className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                to={`/authors/${author.id}`}
                                            >
                                                Modifica
                                            </Link>
                                            <button
                                                className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                onClick={() => onDelete(author)}
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

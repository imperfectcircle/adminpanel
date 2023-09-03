import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../Components/InputField';
import { onSubmit } from '../Utilities/onSubmit';
import { useGetDataForUpdate } from '../Hooks/useGetDataForUpdate';

export default function AuthorsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [author, setAuthor] = useState({
        id: null,
        first_name: '',
        last_name: '',
    });

    const uri = '/authors/';
    const updateText = `L'autore ${author.first_name} ${author.last_name} è stato modificato correttamente.`;
    const createText = `L'autore ${author.first_name} ${author.last_name} è stato creato.`;

    useGetDataForUpdate(id, uri, setAuthor, setLoading);

    const handleSubmit = onSubmit(
        author,
        setNotification,
        navigate,
        setErrors,
        uri,
        updateText,
        createText,
    );

    return (
        <>
            {author.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Modifica Autore</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Stai modificando l&apos;autore {author.first_name}{' '}
                        {author.last_name}
                    </h1>
                </>
            )}
            {!author.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Crea Autore</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Nuovo Autore
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
                        value={author.first_name}
                        onChange={(ev) =>
                            setAuthor({
                                ...author,
                                first_name: ev.target.value,
                            })
                        }
                        type="text"
                        field="first_name"
                        autoComplete="given-name"
                    />
                    <InputField
                        content="Cognome"
                        value={author.last_name}
                        onChange={(ev) =>
                            setAuthor({
                                ...author,
                                last_name: ev.target.value,
                            })
                        }
                        type="text"
                        field="last_name"
                        autoComplete="family-name"
                    />

                    <button className="mx-auto w-1/3 rounded-lg bg-emerald-500 py-3 font-bold text-white shadow-md duration-150 hover:bg-emerald-600">
                        {id ? 'Modifica Autore' : 'Crea Autore'}
                    </button>
                </form>
            )}
        </>
    );
}

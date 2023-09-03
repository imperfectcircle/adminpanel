import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import InputField from '../Components/InputField';
import { onSubmit } from '../Utilities/onSubmit';
import { useGetDataForUpdate } from '../Hooks/useGetDataForUpdate';
import axiosClient from '../axios-client';
import { useMenuVisibility } from '../Hooks/useMenuVisibility';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

export default function ComicsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [menuIsVisible, toggleMenuVisibility] = useMenuVisibility();
    const [comic, setComic] = useState({
        id: null,
        title: '',
        description: '',
        year: '',
        price: '',
        author_id: '',
    });

    const uri = '/comics/';
    const updateText = `Il manga ${comic.title} è stato modificato correttamente.`;
    const createText = `Il manga ${comic.title} è stato creato.`;

    useGetDataForUpdate(id, uri, setComic, setLoading);

    const handleSubmit = onSubmit(
        comic,
        setNotification,
        navigate,
        setErrors,
        uri,
        updateText,
        createText,
    );

    useEffect(() => {
        axiosClient.get('/authors').then(({ data }) => {
            setAuthors(data.data);
        });
    }, []);

    return (
        <>
            {comic.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Modifica Manga</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Stai modificando il manga: {comic.title}
                    </h1>
                </>
            )}
            {!comic.id && (
                <>
                    <Helmet>
                        <title>Pannello di gestione | Crea Manga</title>
                    </Helmet>
                    <h1 className="text-center text-4xl font-bold">
                        Nuovo Manga
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
                        content="Titolo"
                        value={comic.title}
                        onChange={(ev) =>
                            setComic({
                                ...comic,
                                title: ev.target.value,
                            })
                        }
                        type="text"
                        field="title"
                        autoComplete="off"
                    />

                    {/* Dropdown scelta autore */}
                    <div className="flex items-center gap-5">
                        <div onClick={toggleMenuVisibility}>
                            <div className="relative flex items-center space-x-3">
                                <span className="cursor-pointer rounded-lg bg-sky-400 px-5 py-2">
                                    <p className="flex items-center text-white">
                                        Autore
                                        {menuIsVisible && (
                                            <RiArrowUpSLine className="ml-3" />
                                        )}
                                        {!menuIsVisible && (
                                            <RiArrowDownSLine className="ml-3" />
                                        )}
                                    </p>
                                </span>
                            </div>
                            <AnimatePresence>
                                {menuIsVisible && (
                                    <motion.div
                                        className="dropdown-container absolute z-10 mt-1 flex w-fit flex-col items-center justify-center rounded-lg bg-slate-300 shadow-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {authors.map((author) => (
                                            <div
                                                key={author.id}
                                                className="w-full hover:bg-slate-400"
                                            >
                                                <p
                                                    className="cursor-pointer p-2 "
                                                    onClick={() => {
                                                        setComic({
                                                            ...comic,
                                                            author_id:
                                                                author.id,
                                                        });
                                                        setSelectedAuthor(
                                                            author,
                                                        );
                                                        toggleMenuVisibility;
                                                    }}
                                                >
                                                    {`${author.first_name} ${author.last_name}`}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p>
                            {selectedAuthor
                                ? `${selectedAuthor.first_name} ${selectedAuthor.last_name}`
                                : comic.author
                                ? `${comic.author.first_name} ${comic.author.last_name}`
                                : ''}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="comic_description">Sinossi</label>
                        <textarea
                            rows="10"
                            className="resize-none rounded-md shadow-lg focus:bg-emerald-100"
                            name="comic_description"
                            id="comic_description"
                            placeholder="Sinossi"
                            value={comic.description}
                            onChange={(ev) =>
                                setComic({
                                    ...comic,
                                    description: ev.target.value,
                                })
                            }
                        >
                            {comic.description}
                        </textarea>
                    </div>

                    <InputField
                        content="Anno"
                        value={comic.year}
                        onChange={(ev) =>
                            setComic({
                                ...comic,
                                year: ev.target.value,
                            })
                        }
                        type="text"
                        field="year"
                        autoComplete="off"
                    />

                    <InputField
                        content="Prezzo €"
                        value={comic.price}
                        onChange={(ev) =>
                            setComic({
                                ...comic,
                                price: ev.target.value,
                            })
                        }
                        type="text"
                        field="price"
                        autoComplete="off"
                    />

                    <button className="mx-auto w-1/3 rounded-lg bg-emerald-500 py-3 font-bold text-white shadow-md duration-150 hover:bg-emerald-600">
                        {id ? 'Modifica Manga' : 'Crea Manga'}
                    </button>
                </form>
            )}
        </>
    );
}

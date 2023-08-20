export default function Login() {
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form
            className="flex flex-col space-y-10"
            onSubmit={onSubmit}
            action=""
        >
            <h1 className="text-center text-2xl font-bold">
                Accedi al Pannello di Gestione
            </h1>
            <input
                className="rounded-md shadow-lg focus:bg-emerald-100"
                type="text"
                name=""
                id=""
                placeholder="Nome Utente"
            />
            <input
                className="rounded-md shadow-lg focus:bg-emerald-100"
                type="password"
                name=""
                id=""
                placeholder="Password"
            />
            <button className="mx-auto w-1/3 rounded-lg bg-sky-300 py-3 font-bold text-white shadow-md duration-150 hover:bg-sky-400">
                Accedi
            </button>
        </form>
    );
}

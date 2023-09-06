import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="font-montserrat h-screen bg-[#3498DB] p-10 text-white">
            <h1 className="mb-5 text-[30vh]">:(</h1>
            <h2 className="mb-10 text-2xl">
                Si è verificato un errore <span className="text-8xl">404</span>,
                Pagina non trovata, controlla l&apos;indirizzo e prova di nuovo.
            </h2>

            <Link
                className="px-5 py-2 text-xl transition-all duration-200 hover:rounded-md hover:bg-white hover:text-[#3498DB]"
                to="/"
            >
                Torna indietro
            </Link>
        </div>
    );
}

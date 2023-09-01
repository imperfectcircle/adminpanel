import { useEffect, useMemo, useState } from 'react';

export const useMenuVisibility = () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setMenuIsVisible(!menuIsVisible);
    };

    // Funzione per chiudere il dropdown quando si fa clic fuori da esso
    const closeMenuOnClickOutside = (event) => {
        if (menuIsVisible && !event.target.closest('.dropdown-container')) {
            setMenuIsVisible(false);
        }
    };

    useEffect(() => {
        // Aggiungi l'event listener al documento per gestire i clic al di fuori del dropdown
        document.addEventListener('mousedown', closeMenuOnClickOutside);

        // Rimuovi l'event listener quando il componente viene smontato
        return () => {
            document.removeEventListener('mousedown', closeMenuOnClickOutside);
        };
    }, [menuIsVisible]);

    const memoizedState = useMemo(() => {
        return [menuIsVisible, toggleMenuVisibility];
    }, [menuIsVisible]);

    return memoizedState;
};

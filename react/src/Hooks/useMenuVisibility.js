import { useMemo, useState } from 'react';

export const useMenuVisibility = (initialState = false) => {
    const [menuIsVisible, setMenuIsVisible] = useState(initialState);

    const toggleMenuVisibility = () => {
        setMenuIsVisible((prevState) => !prevState);
    };

    const resetVisibility = () => {
        setMenuIsVisible(false);
    };

    const memoizedState = useMemo(() => {
        return [menuIsVisible, toggleMenuVisibility, resetVisibility];
    }, [menuIsVisible]);

    return memoizedState;
};

import { useMemo, useState } from 'react';

export const useMenuVisibility = () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setMenuIsVisible(!menuIsVisible);
    };

    const resetVisibility = () => {
        setMenuIsVisible(false);
    };

    const memoizedState = useMemo(() => {
        return [menuIsVisible, toggleMenuVisibility, resetVisibility];
    }, [menuIsVisible]);

    return memoizedState;
};

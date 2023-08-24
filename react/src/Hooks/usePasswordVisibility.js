import { useMemo, useState } from 'react';

export const usePasswordVisibility = (initialState = false) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(initialState);

    const togglePasswordVisibility = () => {
        setPasswordIsVisible((prevState) => !prevState);
    };

    const memoizedState = useMemo(() => {
        return [passwordIsVisible, togglePasswordVisibility];
    }, [passwordIsVisible]);

    // const PasswordIcon = passwordIsVisible
    //     ? AiOutlineEyeInvisible
    //     : AiOutlineEye;

    return memoizedState;
};

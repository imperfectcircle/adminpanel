import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const usePasswordConfVisibility = () => {
    const [passwordConfIsVisible, setPasswordConfIsVisible] = useState(false);

    const togglePasswordConfVisibility = () => {
        setPasswordConfIsVisible(!passwordConfIsVisible);
    };

    const PasswordConfIcon = passwordConfIsVisible
        ? AiOutlineEyeInvisible
        : AiOutlineEye;

    return [
        passwordConfIsVisible,
        togglePasswordConfVisibility,
        PasswordConfIcon,
    ];
};

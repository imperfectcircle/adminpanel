import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const usePasswordVisibility = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordIsVisible(!passwordIsVisible);
    };

    const PasswordIcon = passwordIsVisible
        ? AiOutlineEyeInvisible
        : AiOutlineEye;

    return [passwordIsVisible, togglePasswordVisibility, PasswordIcon];
};

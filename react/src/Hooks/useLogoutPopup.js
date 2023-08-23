import { useState } from 'react';

export const useLogoutPopup = () => {
    const [popupIsVisible, setPopupIsVisible] = useState(false);

    const togglePopupVisibility = () => {
        setPopupIsVisible(!popupIsVisible);
    };

    return [popupIsVisible, togglePopupVisibility];
};

import axiosClient from '../axios-client';

export const automaticLogout = (setUser, setToken) => {
    let inactivityTimer;

    const logout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        });
    };

    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logout, 60 * 60 * 1000);
    };

    const handleUserActivity = () => {
        resetTimer();
    };

    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    resetTimer();

    return () => {
        clearTimeout(inactivityTimer);
        window.removeEventListener('click', handleUserActivity);
        window.removeEventListener('scroll', handleUserActivity);
    };
};

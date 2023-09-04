/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, setToken] = useState(Cookies.get('access_token'));

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000);
    };

    useEffect(() => {
        // L'effetto collaterale per leggere il token dai cookie quando il componente viene montato
        const storedToken = Cookies.get('access_token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // const setToken = (token) => {
    //     _setToken(token);
    //     if (token) {
    //         localStorage.setItem('ACCESS_TOKEN', token);
    //     } else {
    //         localStorage.removeItem('ACCESS_TOKEN');
    //     }
    // };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                notification,
                setUser,
                setToken: (token) => {
                    Cookies.set('access_token', token, {
                        expires: 7,
                        sameSite: 'strict',
                        secure: true,
                    });
                    setToken(token);
                },
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

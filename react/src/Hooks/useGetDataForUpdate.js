import { useEffect } from 'react';
import axiosClient from '../axios-client';

export const useGetDataForUpdate = (id, url, setData, setLoading) => {
    useEffect(() => {
        getUpdateData();
    }, []);

    const getUpdateData = () => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`${url}${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setData(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    return getUpdateData;
};

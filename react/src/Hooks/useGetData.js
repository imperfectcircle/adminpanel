import { useEffect } from 'react';
import axiosClient from '../axios-client';

export const useGetData = (url, setLoading, setData) => {
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        axiosClient
            .get(url)
            .then(({ data }) => {
                setLoading(false);
                setData(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return getData;
};

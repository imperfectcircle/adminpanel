import axiosClient from '../axios-client';

export const onSubmit = (
    data,
    setNotification,
    navigate,
    setErrors,
    uri,
    updateText,
    createText,
) => {
    return (event) => {
        event.preventDefault();

        if (data.id) {
            axiosClient
                .put(`${uri}${data.id}`, data)
                .then(() => {
                    setNotification(updateText);
                    navigate(uri);
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(uri, data)
                .then(() => {
                    setNotification(createText);
                    navigate(uri);
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };
};

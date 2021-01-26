import axios, { CancelToken, Method } from "axios";

const axiosRequestHelper = async (
    url: string,
    method: Method,
    data: any,
    cancellationToken: CancelToken,
    headers?: { [header: string]: string }) => {

    try {

        const response = await axios(url, {
            method: method,
            data: JSON.stringify(data),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            cancelToken: cancellationToken
        });


        if (response.status < 200 || response.status > 299) {
            console.error(response.data);
            throw response.data.message;
        }

        return response.data;
    }
    catch (error) {
        console.error(error.response.data);
        throw error;
    }
}

export default axiosRequestHelper;
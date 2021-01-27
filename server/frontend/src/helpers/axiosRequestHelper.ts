import axios, { CancelToken, Method } from "axios";

const axiosRequestHelper = async (
    url: string,
    method: Method,
    data: any,
    cancellationToken: CancelToken,
    headers?: { [header: string]: string }) => {

    try {

        const response = await axios(url, {
            method,
            data: JSON.stringify(data),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                ...headers
            },
            cancelToken: cancellationToken
        });


        if (response.status < 200 || response.status > 299) {
            // tslint:disable-next-line: no-console
            console.error(response.data);
            throw response.data.message;
        }

        return response.data;
    }
    catch (error) {
        // tslint:disable-next-line: no-console
        console.error(error.response.data);
        throw error;
    }
}

export default axiosRequestHelper;
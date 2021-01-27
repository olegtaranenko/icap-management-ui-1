import axios, { CancelToken, Method } from "axios";

const axiosHelper = async (
    url: string,
    method: Method,
    data: any,
    cancellationToken: CancelToken,
    headers?: { [header: string]: string }) => {

    const response = await axios(url, {
        method,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        cancelToken: cancellationToken
    });


    if (response.status < 200 || response.status > 299) {
        throw new Error(response.statusText);
    }

    return response.data;
}

export default axiosHelper;
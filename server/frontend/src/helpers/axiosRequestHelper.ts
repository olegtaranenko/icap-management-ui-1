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

        return response.data;
    }
    catch (error) {
        // tslint:disable-next-line: no-console
        console.error(error.response.data);

        if ([401, 403].indexOf(error.response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            localStorage.removeItem("currentUser");
            window.location.reload();
        }

        throw error;
    }
}

export default axiosRequestHelper;
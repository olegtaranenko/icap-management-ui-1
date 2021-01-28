import axios, { CancelToken, Method } from "axios";

const axiosRequestHelper = async (
    url: string,
    method: Method,
    cancellationToken: CancelToken,
    authToken?: string,
    data?: any,
    headers?: { [header: string]: string }) => {

    try {
        const response = await axios(url, {
            method,
            data: JSON.stringify(data),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': authToken,
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
            if (localStorage.getItem("currentUser")) {
                localStorage.removeItem("currentUser");
                window.location.reload();
            }
        }

        throw error;
    }
}

export default axiosRequestHelper;
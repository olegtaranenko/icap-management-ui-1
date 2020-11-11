export const getPolicy = async (baseUrl: string): Promise<string> => {
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.text();
}
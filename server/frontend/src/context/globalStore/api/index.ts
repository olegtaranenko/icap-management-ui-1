import Routes from "../../../Routes";

export const getVersion = async (): Promise<string> => {
    const response = await fetch(Routes.root.versionRoute, {
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
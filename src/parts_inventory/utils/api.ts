export const fetchAPI = async (apiUrl: string, callback: (data: { [key: string]: string },
    response: Response) => void, options = {}) => {

    const mapOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        ...options,
    };
    const response = await fetch(apiUrl, mapOptions);
    const data = await response.json();
    if (response.status === 401 && !response.url.includes('success')) {
        window.location.replace("/login");
        return false;
    }
    return callback(data, response);
};

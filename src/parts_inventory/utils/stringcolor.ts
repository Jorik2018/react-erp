export const stringToColour = (str: string, opacity: string = 'FF') => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let x = 0; x < 3; x++) {
        const value = (hash >> (x * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).slice(-2);
    }
    return colour + opacity;
};

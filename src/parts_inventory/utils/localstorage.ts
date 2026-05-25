const isObject = (objValue: { [key: string]: string | number }) => {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
};

export const initLocalStorage = () => {
    if (localStorage.getItem('pia') === null) {
        localStorage.setItem('pia', JSON.stringify({}));
    }
    return true;
};

export const getLocalStorage = (item: string) => {
    const retrieveObject = JSON.parse(localStorage.getItem('pia')!) as { [key: string]: string };
    return retrieveObject[item];
};

export const setLocalStorage = (item: { [key: string]: string | number }) => {
    if (!isObject(item)) {
        return false;
    }
    const retrieveObject = JSON.parse(localStorage.getItem('pia')!);
    localStorage.setItem('pia', JSON.stringify({
        ...retrieveObject,
        ...item,
    }));
    return true;
};

import { MutableRefObject, useRef } from 'react';

export const useFocus = (): [MutableRefObject<HTMLInputElement>, setFocus: () => void] => {

    const htmlElRef = useRef(null as unknown as HTMLInputElement);

    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
};

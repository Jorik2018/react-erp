import { useEffect } from 'react';

export const Filter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}:{    preGlobalFilteredRows:{[key:string]:string}[],
    globalFilter:string,
    setGlobalFilter:(globalFilter:string|null)=>void}) => {
    const [inputRef, setInputFocus] = useFocus();
    const count = preGlobalFilteredRows.length;

    useEffect(() => {
        setInputFocus();
    }, []);

    return (
        <div className="uk-inline">
            <button
                type="button"
                className="uk-form-icon uk-form-icon-flip"
                uk-icon="icon: close"
                onClick={() => {
                    setGlobalFilter(null);
                    setInputFocus();
                }}
            />
            <input
                ref={inputRef}
                className="filter uk-input"
                type="text"
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || null);
                }}
                placeholder={`Search in ${count} records ...`}
            />
        </div>
    );
};

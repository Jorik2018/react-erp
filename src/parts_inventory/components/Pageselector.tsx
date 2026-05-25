export const Pageselector = (props: {
    pageCount: number, pageIndex: number,
    gotoPage: (page: number) => void
}) => {
    return (
        <input
            className="pageselector uk-input"
            type="number"
            min="0"
            max={props.pageCount}
            defaultValue={props.pageIndex + 1}
            onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                props.gotoPage(page);
            }}
        />
    );
};

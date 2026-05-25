export const prepareForm = (data: { [key: string]: { name: string } }) => {

    return Object.fromEntries(
        Object.entries(data).map(([, value]) =>
            [`${value.name}`, '']
        )
    );
};

import { matchSorter } from 'match-sorter';

export const fuzzyTextFilter = (rows:{values:{[key:string]:string}}[], id: string, filterValue: string) => {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
};

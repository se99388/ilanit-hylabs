import { getRow, getRows } from './result';

export const getInterests = () => {
    const sql = `
        SELECT *
        FROM interests
    `;

    return getRows(sql);
};

export const getInterest = id => {
    const sql = `
        SELECT name
        FROM interests
        WHERE id = $1
    `;

    return getRow(sql, id);
};

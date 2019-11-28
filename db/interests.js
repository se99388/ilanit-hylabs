import { getRow } from './result';

export const getInterest = id => {
    const sql = `
        SELECT name
        FROM interests
        WHERE id = $1
    `;

    return getRow(sql, id);
};

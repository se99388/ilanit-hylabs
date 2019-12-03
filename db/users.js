import { getRow, getRows } from './result';

export const getUsers = () => {
    const sql = `
        SELECT 
            id,
            first_name,
            last_name,
            lab 
        FROM users
    `;

    return getRows(sql);
};

export const getUser = id => {
    const sql = `
        SELECT * 
        FROM users
        WHERE id = $1
    `;

    return getRow(sql, id);
};

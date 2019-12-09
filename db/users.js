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

export const addUser = (...userDetails) => {
    const sql =`INSERT INTO users (first_name,
            last_name,
            email, 
            phone, 
            institute,
            lab)
            VALUES
    ($1,$2, $3,$4, $5, $6) RETURNING *`;
    return getRow(sql, ...userDetails);
}


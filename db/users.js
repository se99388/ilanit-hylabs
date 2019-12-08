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

export const addUser = (values) => {
    const sql =
        `INSERT INTO users (first_name,
            last_name,
            email, 
            phone, 
            institute,
            lab)
    VALUES
    ('${values.firstName}', '${values.lastName}', '${values.email}',' ${values.phone}', '${values.institute}', '${values.lab}') RETURNING *`
    return getRows(sql);
}

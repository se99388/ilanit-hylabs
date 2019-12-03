import { query } from './pg';

export const getRows = async (text, ...params) => {
    const { rows } = await query(text, params);
    return rows;
};

// getRow(text, 1,2,3) => text=text, args=[1,2,3]
export const getRow = async (text, ...args) => {
    // spreading the args again cause getRows wants spread arguments and not array!
    const rows = await getRows(text, ...args);
    return rows[0];
};

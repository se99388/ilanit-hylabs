import { getRows, getRow } from './result';

export const getRewards = () => {
    const sql = `SELECT 
    id,
    reward,
    quantity,
    image
    FROM rewards
    ORDER BY id ASC
    `;
    return getRows(sql);
};

export const removeReward = id => {
    const sql = `DELETE FROM rewards
                WHERE id = $1 RETURNING *`;
    return getRow(sql, id);
};

export const updateReward = (id, reward, quantity, image) => {
    const sql = `UPDATE rewards
                    SET reward = $2,
                    quantity = $3,
                    image = $4
                WHERE id = $1 RETURNING *`;
    return getRow(sql, id, reward, quantity, image);
};

export const addReward = (reward, quantity, image) => {
    const sql = `INSERT INTO rewards 
    (reward,
    quantity,
    image)
    VALUES
    ($1, $2, $3) RETURNING *`;
    return getRow(sql, reward, quantity, image);
};

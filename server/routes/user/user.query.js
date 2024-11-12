const getUsers = `
    SELECT *
    FROM user;
`;

const getUser = `
    SELECT *
    FROM user
    WHERE id = ?;
`;

const putUser = `
    UPDATE user
    SET firstname = ?, name = ?, email = ?
    WHERE id = ?;
`;

const deleteUser = `
    DELETE FROM user
    WHERE id = ?
`;

module.exports = {
    getUsers,
    getUser,
    putUser,
    deleteUser
};

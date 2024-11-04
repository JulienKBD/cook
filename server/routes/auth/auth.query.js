const createUser = `
    INSERT INTO user
    (email, password, name, firstname)
    VALUES (?, ?, ?, ?);
`;

const getUserByEmail = `
    SELECT *
    FROM user
    WHERE email = ?;
`;

module.exports = {
    createUser,
    getUserByEmail
};

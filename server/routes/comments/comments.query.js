const getComments = `
    SELECT comments.*, user.firstname
    FROM comments
    JOIN user ON comments.user_id = user.id
    WHERE comments.recipe_id = ?
    ORDER BY created_at DESC
`;

const createComments = `
    INSERT INTO comments (recipe_id, user_id, content, rating, created_at)
    VALUES (?, ?, ?, ?, ?)
`;

const putCommentsById = `
    UPDATE comments
    SET content = ?, rating = ?, updated_at = ?
    WHERE id = ? AND user_id = ?;
`;

const deleteCommentsById = `
    DELETE FROM comments
    WHERE id = ?;
`;

module.exports = {
    getComments,
    createComments,
    putCommentsById,
    deleteCommentsById
};

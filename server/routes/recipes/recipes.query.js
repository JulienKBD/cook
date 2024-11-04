const getRecipe = `
    SELECT *
    FROM recipes
    WHERE tittle_id = ?;
`;

const createRecipe = `
    INSERT INTO recipes (title, description, image_url)
    VALUES (?, ?, ?);
`;

const putRecipe = `
    UPDATE recipes
    SET title = ?, description = ?, image_url = ?
    WHERE id = ?;
`;

const deleteRecipe = `
    DELETE FROM recipes
    WHERE id = ?
`;

module.exports = {
    getRecipe,
    createRecipe,
    putRecipe,
    deleteRecipe
};

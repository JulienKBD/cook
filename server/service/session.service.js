const pool = require('../config/db').promise();

async function createSession(userId, userAgent) {
    const sql = `INSERT INTO session (user_id, user_agent, valid) VALUES (?, ?, ?)`;

    try {
        const [result] = await pool.execute(sql, [userId, userAgent, true]);

        return result.insertId;
    } catch (error) {
        console.log('Error during session creation:', error);
        return res.redirect("http://localhost:3001/oauth/error");;
    }
}

module.exports = createSession;
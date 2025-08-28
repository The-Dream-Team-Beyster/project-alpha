const db = require('../db/connect');

class User {

    constructor({ user_id, username, password, high_score = 0, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.high_score = high_score;
        this.isAdmin = is_admin;
    }

    static async getHighscore() {
        const response = await db.query("SELECT username, high_score FROM user_account ORDER BY high_score DESC;");
        if (response.rows.length === 0) {
            throw new Error("Unable to locate users.");
        }
        return response.rows;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (username, password, high_score) VALUES ($1, $2, 0) RETURNING user_id;",
            [username, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }

    async update(data) {
        console.log(data)
        const response = await db.query("UPDATE user_account SET high_score = $1 WHERE username = $2 RETURNING high_score;",
            [ data.score, data.username ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update highscore.")
        }
        return response.rows[0];
    }
}

module.exports = User;
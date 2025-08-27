const db = require('../database/connect');

class Post {

    constructor({ post_id, username, score }) {
        this.id = post_id;
        this.username = username;
        this.score = score;
    }

        static async createScore(id) {
        const response = await db.query("SELECT score FROM post WHERE id = $1", [id])

        if(response.rows.length === 0) {
            throw new Error("score cannot be retrieved")
        }

        const score = response.rows[0].post_id
        return score
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const { username, score } = data;
        let response = await db.query("INSERT INTO post (username, score) VALUES ($1, $2) RETURNING post_id;",
            [username, score]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;
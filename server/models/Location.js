const db = require("../database/connect");

class Location {
    constructor({id, name, funFact}) {
        this.id = id;
        this.name = name;
        this.funFact = funFact
    }

    static async getCountryName(id) {
        const response = await db.query("SELECT name FROM countries WHERE id = ($1);", [id]);

        if (response.rows.length === 0) {
            throw new Error("No Location Found")
        }

        return response.rows.map(g => newCountry(g));
    }

    static async revealCountryName() {
        const response = await db.query("SQL HERE");

        if (response.rows.length !=1) {
            throw new Error("Unable to reveal name")
        }

        return new Location(response.rows[0]);
    }
}
const db = require("../db/connect");

class Location {
    constructor({id, name, funFact}) {
        this.id = id;
        this.name = name;
        this.funFact = funFact
    }

    static async getCountryName() {
        const response = await db.query("SELECT name FROM countries ORDER BY RAND() LIMIT 1");

        if (response.rows.length === 0) {
            throw new Error("No Location Found")
        }

        return response.rows.map(g => newCountry(g));
    }

    static async getFunFact(name) {
        const response = await db.query("SELECT funfact FROM countries WHERE name = $1", [name]);

        if (response.rows.length !=1) {
            throw new Error("Unable to show fun fact")
        }

        return new Location(response.rows[0]);
    }

}

console.log("hit 1");

module.exports = {Location};
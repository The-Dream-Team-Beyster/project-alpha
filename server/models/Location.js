const db = require("../db/connect");

class Location {
    constructor({id, country_id, name, funFact}) {
        this.id = id;
        this.country_id = country_id;
        this.name = name;
        this.funFact = funFact
    }

    static async getAllCountries() {
        const response = await db.query("SELECT name, country_id, funFact FROM countries;");

        if (response.rows.length === 0) {
            throw new Error("No Countries Found")
        }
        return response.rows
    }

    static async getRandomCountry() {
        const response = await db.query("SELECT name FROM countries ORDER BY RAND() LIMIT 1;");

        if (response.rows.length === 0) {
            throw new Error("No Location Found")
        }

        return response//.rows.map(g => newCountry(g));
    }

    static async getFunFact(name) {
        const response = await db.query("SELECT funfact FROM countries WHERE name = $1", [name]);

        if (response.rows.length !=1) {
            throw new Error("Unable to show fun fact")
        }

        return new Location(response.rows[0]);
    }

}

module.exports = Location;
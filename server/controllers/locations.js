const Location = require("../models/Location");

async function getAll(req, res) {
    try {
        const location = await Location.getAllCountries();
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function getCountry(req, res) {
    try {
        const location = await Location.getRandomCountry();
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

module.exports = {getCountry, getAll}
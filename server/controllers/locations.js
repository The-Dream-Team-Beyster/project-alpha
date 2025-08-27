const Location = require("../models/Location");

async function getCountry(req, res) {
    try {
        const location = await Location.getCountryName(id);
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

module.exports = {getCountry}
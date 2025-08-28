const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

async function register(req, res) {
    try {
      const data = req.body;
  
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  
      // Hash the password
      data["password"] = await bcrypt.hash(data.password, salt);
      console.log(data)
      const result = await User.create(data);
  
      res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneByUsername(data.username);
      if(!user) { throw new Error('No user with this username') }
      const match = await bcrypt.compare(data.password, user.password);
  
      if (match) {
        const payload = { username: user.username }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
            });
        }

        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } else {
        throw new Error('User could not be authenticated')  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}

async function update(req, res) {
    const {score, token} = req.body;
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN)
      const username = payload.username;
      const user = await User.getOneByUsername(username);
      const data = {username: username, score: score}
      let result
      if(user.high_score < score){
        result = await user.update(data);
      }
      else{
        console.log('better luck next time!')
      }
      res.status(200).send({data: result})
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}

module.exports = {
    register, login, update
}                           
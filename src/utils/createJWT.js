require('dotenv').config()
const jwt = require('jsonwebtoken');

var token = jwt.sign({name: 'ta-vivo-api'}, process.env.JWT_KEY);
console.log('Use the following JWT to make request to this service -> \n', token);

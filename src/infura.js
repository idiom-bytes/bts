const Infura = require('web3');
const dotenv = require('dotenv');
dotenv.config("../.env");

const INFURA_API_KEY = process.env.INFURA_API_KEY || 'your_api_key';
const url = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
const infura = new Infura(new Infura.providers.HttpProvider(url));

module.exports = infura;
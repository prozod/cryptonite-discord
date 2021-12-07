require('dotenv').config()
const axios = require('axios')

async function conversionCalc(amount, coin, currency) {
    const data = await axios({
        method: "get",
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY
        },
        url: `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?&amount=${amount}&symbol=${coin}&convert=${currency}`,
        // https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=12&symbol=BTC&convert=USD
        json: true,
    })
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            if (error.response) {
                return error.response.status;
                // return error.response.data
            }
        })
    console.log('DATA', data);
    return data;
}

// url: `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&symbol=${coin}&convert=${currency}`,
module.exports = conversionCalc;

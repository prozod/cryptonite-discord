require('dotenv').config()
const axios = require('axios')

async function fetchCoin(coin) {
    const data = await axios({
        method: "get",
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY
        },
        url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?&slug=${coin}`,
        json: true,
    })
        .then((res) => res.data.data)
        .catch((error) => {
            if (error.response) {
                return error.response.status;
                // return error.response.data
            }
        })

    console.log('DATA',  data);
    const coinId = Object.keys(data).flat()
    const coinInfo = data[coinId]
    return coinInfo;
}

module.exports = fetchCoin;

const {nf, pf} = require('../utils/utils')

function displayCoin(coin, message) {
    const statsQuote = coin?.quote?.USD
    let price = coin?.quote?.USD.price
    if (price > 0.01) {
        (price).toFixed(2)
        console.log(price);
    } else {
        (price).toFixed(6)
    }
    return message.reply(`**${coin.name} (${coin.symbol})** is currently **${pf(price, 'USD')}**\n\n- Max supply is ${coin.max_supply ? nf.format(coin.max_supply) : nf.format(coin.total_supply)} coins\n- Circulating supply is ${nf.format(coin.circulating_supply)} coins\n- Market cap is ${pf(statsQuote.market_cap, 'USD')}\n- Daily percentual change is ${(statsQuote.percent_change_24h).toFixed(2)}%\n- Weekly percentual change is ${(statsQuote.percent_change_7d).toFixed(2)}%`)
        .then(() => console.log(`Replied to "${message.content}" from ${message.author.tag}`))
        .catch(console.error);
};

module.exports = displayCoin;

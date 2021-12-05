require('dotenv').config()
const { Intents, Client } = require('discord.js')
// const getCryptoCoin = require('../getCrypto')
const fetchCoin = require('../fetchCoin')

////////////////////////////////

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const PREFIX = '$'

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
})


client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    if (message.content.startsWith(PREFIX)) {
        const msg = message.content.replace(/\s/g, "-").substring(PREFIX.length)
        const coin = await fetchCoin(msg)
        const nf = new Intl.NumberFormat('en-US')
        const pf = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        console.log('COI',coin);
        if (coin == undefined) {
            console.log('ERROR');
            message.reply(`**Cannot find "${msg}".**\nPlease ensure that the currency you're looking for written correctly.\nNo symbols allowed.`)
        } else {
            const statsQuote = coin.quote.USD
            let price = coin.quote.USD.price
            if (price > 0.01) {
                (price).toFixed(2)
                console.log(price);
            } else {
                (price).toFixed(6)
            }
            message.reply(`**${coin.name} (${coin.symbol})** is currently **${pf.format(price)}**\n\n- Max supply is ${coin.max_supply ? nf.format(coin.max_supply) : nf.format(coin.total_supply)} coins\n- Circulating supply is ${nf.format(coin.circulating_supply)} coins\n- Market cap is ${statsQuote.market_cap}\n- Daily percentual change is ${(statsQuote.percent_change_24h).toFixed(2)}%\n- Weekly percentual change is ${(statsQuote.percent_change_7d).toFixed(2)}%`)
                .then(() => console.log(`Replied to "${message.content}" from ${message.author.tag}`))
                .catch(console.error);
        }
    }
})

client.login(process.env.DISCORDJS_TOKEN)


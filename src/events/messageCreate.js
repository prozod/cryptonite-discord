const fetchCoin = require('../utils/fetchCoin')
const displayCoin = require('../utils/displayCoin')
const PREFIX = '$'

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return
        if (message.content.startsWith(PREFIX)) {
            const msg = message.content.replace(/\s/g, "-").substring(PREFIX.length)
            const coin = await fetchCoin(msg)
            console.log('COIN', coin);
            if (coin === undefined) {
                message.reply(`**Cannot find "${msg}".**\nPlease ensure that the currency you're looking for is written correctly.\nNo symbols allowed.`)
            } else {
                displayCoin(coin, message)
            }
        }
    }
}

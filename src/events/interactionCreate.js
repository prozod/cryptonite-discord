const conversionCalc = require('../utils/conversionCalc')
const {pf } = require('../utils/utils')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            console.log('COMMAND:', command);

            if (!command) return;


            try {
                if (command.data.name === 'convert') {
                    const amount = interaction.options.getNumber('amount');
                    const from = interaction.options.getString('from');
                    const to = interaction.options.getString('to').toUpperCase();
                    console.log(amount, from, to);
                    const res = await conversionCalc(amount, from, to)
                    const value = res.quote[to].price
                    
                    await interaction.reply(`**${res.amount} ${res.name} (${res.symbol})** are equal to **${pf(value, to)} ${to}**`);
                }
                else {
                    await command.execute(interaction, client)
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this command.",
                    ephemeral: true
                })
            }
        }

        // if (interaction.isSelectMenu()) {
        //     console.log(interaction);
        //     if (interaction.costumId === 'convert-currency') {
        //         await interaction.reply({ content: `You picked ${interaction.values}` })
        //     }
        // }
    }
}

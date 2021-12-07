const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert')
        .setDescription('Convert crypto to fiat.')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount to be converted')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('from')
                .setDescription('Currency to convert from')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('Currency to convert from')
                .setRequired(true)
                .addChoice('Euro', 'eur')
                .addChoice('United States Dollar', 'usd')
                .addChoice('Pound sterling (GBP)', 'gbp')),
};

    // async execute(interaction) {
    //     await interaction.reply('Ma pis pe ma-ta!');
    // },

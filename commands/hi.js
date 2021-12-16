const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('You idiot'),
	async execute(interaction) {
		await interaction.reply(`Kill yourself ${interaction.user} \n Seriously!!!`);
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age')
		.setDescription('How old are you?')
		.addIntegerOption(option => option.setName('input')
			.setDescription('write your age')
			.setRequired(true)),
	async execute(interaction) {
		const age = interaction.options.getInteger('input');
		await interaction.reply(`you are ${age} years old!`);
	},
};
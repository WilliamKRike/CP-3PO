const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('Reacts to message'),
	async execute(interaction) {
		const message = await interaction.reply({ content: 'You can react with custom emojis!', fetchReply: true });
		const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'huGoblin');
		message.react(reactionEmoji);
	},
};
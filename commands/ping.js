const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute(interaction) {
		const textCh = interaction.channelId;
		const channel = interaction.guild.channels.cache.get(textCh);
		channel.send(`Pong! ${interaction.user}`);
	},
};
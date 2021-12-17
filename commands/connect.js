const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('connect to current channel'),
	async execute(interaction) {
		await interaction.reply(`Pong! @${interaction.user.tag}`);
		if (!interaction.member.voice.channel) return interaction.channel.send('Please connect to a voice channel!');
		// If you are not in the voice channel, then return a message
		interaction.member.voice.channel.join();
		// Join the voice channel

	},
};
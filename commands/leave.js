const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, createAudioPlayer } = require('@discordjs/voice');
// const { Guild } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the current channel'),
	execute(message) {
		const connection = getVoiceConnection(message.guild.id);
		message.reply('Leaving channel...');
		const player = createAudioPlayer();
		player.stop();
		connection.destroy();
	} };
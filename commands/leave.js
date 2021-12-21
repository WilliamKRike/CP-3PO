const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnections, createAudioPlayer } = require('@discordjs/voice');
// const { Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the current channel'),
	execute(message) {

		/* if (getVoiceConnections().channelId == undefined) {
			console.log('not in voice channel, will do nothing');
			message.reply('Not in a voice channel!');
		}
		else {
		}
		*/
		const connection = getVoiceConnections(message.guild.id);
		message.reply('Leaving channel...');
		const player = createAudioPlayer();
		player.stop();
		connection.destroy();


	} };
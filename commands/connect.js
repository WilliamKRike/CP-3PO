const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { Client, VoiceState } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('connect to current channel'),
	execute(message) {
		message.reply('Joining channel...');
		joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		console.log(VoiceState.channelId);
		if (Client.voice) {
			console.log('its here');
		}
	} };
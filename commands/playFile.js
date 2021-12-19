const { SlashCommandBuilder } = require('@discordjs/builders');
// const { createReadStream } = require('fs');
// const { join } = require('path');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playFile')
		.setDescription('play a file to current channel'),
	execute(message) {
		message.reply('Joining channel...');
		joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
	} };
const { SlashCommandBuilder } = require('@discordjs/builders');
const { VoiceConnection } = require('@discordjs/voice');
// const { Guild } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('connect to current channel'),
	execute(message) {
		message.reply('Joining channel...');
		VoiceConnection.destroy();
	} };
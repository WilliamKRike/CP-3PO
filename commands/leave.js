const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the current channel'),
	execute(message) {
		const connection = getVoiceConnection(message.guildId);
		// if it's already not in a lobby do nothing
		if (message.guild.me.voice.channelId == null) {
			message.reply('The bot is not connected to any channel, you dip');
		}
		// if it's in another voice channel
		else if (message.guild.me.voice.channelId != message.member.voice.channel.id) {
			message.reply(`The bot is in a different voice channel, ${message.guild.me.voice.channel}, you dip`);
		}
		else {
			message.channel.send('Leaving channel...');
			connection.disconnect();
			console.log(message.guild.me.voice.channelId);
		}
	} };
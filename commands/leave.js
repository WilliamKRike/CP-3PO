const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnections, createAudioPlayer } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the current channel'),
	execute(message) {

		console.log(message.guild.me.voice.channelId);
		// if it's already not in a lobby do nothing
		if (message.guild.me.voice.channelId == null) {
			message.reply('The bot is not connected to any channel, you dip');
		}
		// if it's in another voice channel
		else if (message.guild.me.voice.channelId != message.member.voice.channel.id) {
			message.reply(`The bot is in a different voice channel, ${message.guild.me.voice.channel}, you dip`);
		}
		else {
			const connection = getVoiceConnections(message.guild.id);
			message.reply('Leaving channel...');
			const player = createAudioPlayer();
			player.stop();
			connection.destroy();
		}


	} };
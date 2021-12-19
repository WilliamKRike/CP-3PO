const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

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

		const player = createAudioPlayer();
		const resource = createAudioResource('/snestownsims.mp3');
		player.play(resource);
	} };
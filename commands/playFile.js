const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const { createAudioResource, StreamType, NoSubscriberBehavior, createAudioPlayer, getNextResource, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playfile')
		.setDescription('play file to current channel'),
	execute(message) {
		message.reply('Joining channel...');
		joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});
		const connection = getVoiceConnection(message.guild.id);
		const resource = createAudioResource(createReadStream('./snestownsims.ogg'), {
			inputType: StreamType.OggOpus,
		});
		connection.subscribe();
		player.play(resource);

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
			player.play(getNextResource());
		});
	} };
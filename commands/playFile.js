const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const { createAudioResource, StreamType, AudioPlayerStatus, createAudioPlayer, getNextResource, NoSubscriberBehavior } = require('@discordjs/voice');
// const { Client, Intents } = require('discord.js');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });


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

		// After joining, create an audio player
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});

		// check for error again
		player.on('error', error => {
			console.error('Error:', error.message, 'with track', error.resource.metadata.title);
		});

		// because FFMPEG is for chuds
		const resource = createAudioResource(createReadStream('./snestownsims.ogg'), {
			inputType: StreamType.OggOpus,
			metadata: {
				title: 'test song',
			},
		});

		// play pre-established file!
		player.play(resource);
		console.log('Playing song!');

		// is the player playing?
		player.on(AudioPlayerStatus.Playing, () => {
			console.log('The audio player has started playing!');
		});

		// is it idle?
		player.on(AudioPlayerStatus.Idle, () => {
			console.log('its idle!!!');
			player.play(getNextResource());
		});

		// is it broken?
		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
			player.play(getNextResource());
		});
	} };
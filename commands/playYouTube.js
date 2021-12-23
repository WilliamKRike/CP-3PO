const { createReadStream } = require('fs');
const fs = require('fs');
const ytdl = require('ytdl-core');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube')
		.addStringOption(option => option.setName('link')
			.setDescription('Enter link here')
			.setRequired(true)),
	async execute(message) {
		const link = message.options.getString('link');
		message.reply(`Playing your video!\nLink: ${link}`);
		await ytdl(`${link}`)
			.pipe(fs.createWriteStream('video.mp3'));

		const connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		//	const connection = getVoiceConnection(message.member.voice.channel.id);
		// After joining, create an audio player
		const player = createAudioPlayer();
		connection.subscribe(player);

		// initialize the file
		const resource = createAudioResource(createReadStream('./video.mp3'), {
			inlineVolume: true,
			metadata: {
				title: 'file',
			},
		});

		// play pre-established file!

		console.log('Playing song!');
		connection.on('stateChange', (oldState, newState) => {
			console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});
		console.log('Bot\'s up and runnin\'!');
		player.play(resource);

		// check for error again ??
		player.on('error', error => {
			console.error('Error:', error.message, 'with track', error.resource.metadata.title);
		});
	},
};
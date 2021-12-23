const { createReadStream } = require('fs');
const fs = require('fs');
const ytdl = require('ytdl-core');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
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
		// download file
		await ytdl(`${link}`)
			.pipe(fs.createWriteStream('video.mp3'));

		// initialize the file
		const connection = await joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

		// After joining, create an audio player
		const player = await createAudioPlayer();
		await connection.subscribe(player);
		playResource();

		// play pre-established file!
		connection.on('stateChange', (oldState, newState) => {
			console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on(AudioPlayerStatus.Idle, () => {
			console.log('IDLE WARN\nIdle for some reason!');
			playResource();
		});

		console.log('Bot\'s up and runnin\'!');
		function playResource() {
			const resource = createAudioResource(createReadStream('./video.mp3'), {
				inlineVolume: true,
				metadata: {
					title: 'file',
				},
			});
			player.play(resource);
			console.log('Playing song!');
		}


		// check for error again ??
		player.on('error', error => {
			console.error('Error:', error.message, 'with track', error.resource.metadata.title);
		});
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createReadStream } = require('fs');
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
// const { Client, Intents } = require('discord.js');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('playfile')
		.setDescription('play file to current channel'),
	async execute(message) {
		message.reply('Joining channel...');
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
		const resource = createAudioResource(createReadStream('./fart.mp3'), {
			inlineVolume: true,
			metadata: {
				title: 'test song',
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
	} };
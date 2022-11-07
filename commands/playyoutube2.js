const play = require('ytdl-core');
const { AudioPlayerState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play2')
		.setDescription('play youtube audio')
		.addStringOption(option => option.setName('query')
			.setDescription('Enter terms or link here')
			.setRequired(true)),
	async execute(message, skipCheck) {
		message.reply('NEW playing song!?');
		console.log('New Playing Exectued!');
		// define queue for server
		const serverQueue = queue.get(message.guild.id);
		console.log(serverQueue);

		// create player/resource objects
		const connection = joinVoiceChannel({
			channelId : message.member.voice.channel.id,
			guildId : message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();

		if (skipCheck == true) {
			console.log('skip was true');
		}

		connection.on('stateChange', (oldState, newState) => {
			console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});
	},
};

// const stopSong () => {

// }

// const skipSong () => {

// }

// const playSong () => {

// }

// const leave () => {
//     const command = message.client.commands.get('leave');
//     command.execute(message);
//     queue.delete(message.guild.id);
//     return;
// }
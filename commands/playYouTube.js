const play = require('play-dl');
const { AudioPlayerState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const skipKai = require('./skipKai');
const queue = new Map();
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube audio')
		.addStringOption(option => option.setName('query')
			.setDescription('Enter terms or link here')
			.setRequired(true)),
	async execute(message, skipCheck) {
		message.reply('Your song has been added!');

		// define queue for server
		const serverQueue = queue.get(message.guild.id);

		// create player/resource objects
		const connection = joinVoiceChannel({
			channelId : message.member.voice.channel.id,
			guildId : message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Stop,
			},
		});

		if (skipCheck == true) {
			console.log('skip was true');
			player.on('idle', () => {
				// songs.shift();
				console.log('inside idle state');
				// Play next song

			});
			// video_player(message.guild.id, serverQueue.songs[0], player, message, true);
			return;
		}
		// define variables used to search and download urls
		const args = message.options.getString('query');
		// makeQueue
		if (!serverQueue) {
			//	join vc to play it
			connection.subscribe(player);

			const queue_constructor = {
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channelId,
				connection: null,
				songs: [],
			};
			queue.set(message.guild.id, queue_constructor);
			// console.log(queue.get(message.guild.id));
			console.log('queue was empty adding first song');
			console.log(args);
			queue_constructor.songs.push(args);
			// console.log(queue_constructor.songs[0]);
			video_player(message.guild.id, queue_constructor.songs[0], player, message, false);
		}
		else {
			console.log('push song here');
			serverQueue.songs.push(args);
			console.log('current queue');
			console.log(serverQueue);
			console.log('song being appended to queue');
			console.log(args);
		}
		/*
        OR if you want to get info about youtube link and then stream it
        let yt_info = await play.video_info(args)
        console.log(yt_info.video_details.title)
        let stream = await play.stream_from_info(yt_info)
        */
		connection.on('stateChange', (oldState, newState) => {
			console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});

	},
};

// skip function
const skip = async (guild, player, message) => {
	const song_queue = queue.get(message.guild.id);
	console.log(song_queue);
	player.pause();
};
const playNext = async (guild, args, player, message) => {
// search based on next arg
	const yt_info = await play.search(args, { limit:1 });
	// create stream from arg
	const stream = await play.stream(yt_info[0].url);
	// after stream generated, create file from the url of hte search query
	const resource = createAudioResource(stream.stream, {
		inputType : stream.type,
	});
	player.play(resource);
	await message.channel.send(`🎶 Now playing **${resource.title}**`);
};

// playing function
const video_player = async (guild, args, player, message, skip2) => {
	if (skip2 == true) {
		console.log('before pause');
		player.destroy();
		console.log('after pause');
		return;
	}
	const song_queue = queue.get(message.guild.id);
	console.log('queue info ** queue info');
	console.log(song_queue);

	// If no song is left in the server queue. Leave the voice channel and delete the queue and value pair from the global queue.
	if (!args) {
	//	song_queue.voice_channel.leave();
		const command = message.client.commands.get('leave');
		command.execute(message);
		queue.delete(message.guild.id);
		return;
	}
	playNext(guild, args, player, message);

	// listen after the song is playing
	player.on('stateChange', (oldState, newState) => {
		if (oldState.status == 'playing' && newState.status == 'idle') {
			console.log('song ended');
			song_queue.songs.shift();
			video_player(guild, song_queue.songs[0], player, message, false);
		}
	});

};
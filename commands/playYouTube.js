const play = require('play-dl');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
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
	async execute(message) {
		const serverQueue = queue.get(message.guild.id);
		message.reply('Playing your song!');
		const connection = joinVoiceChannel({
			channelId : message.member.voice.channel.id,
			guildId : message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		// makeQueue
		if (!serverQueue) {
			const queue_constructor = {
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channelId,
				connection: null,
				songs: [],
			};
			queue.set(message.guild.id, queue_constructor);
			queue_constructor.songs.push(33);
			console.log(queue_constructor.songs[0]);
			video_player(message.guild.id, queue_constructor.songs[0]);
		}
		else {
			queue.songs.push(40);
			console.log(queue.songs[0]);
		}

		const args = message.options.getString('query');
		const yt_info = await play.search(args, { limit:1 });
		const stream = await play.stream(yt_info[0].url);

		/*
        OR if you want to get info about youtube link and then stream it
        let yt_info = await play.video_info(args)
        console.log(yt_info.video_details.title)
        let stream = await play.stream_from_info(yt_info)
        */

		const resource = createAudioResource(stream.stream, {
			inputType : stream.type,
		});

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play,
			},
		});
		player.play(resource);
		connection.subscribe(player);

		console.log('Playing song!');
		connection.on('stateChange', (oldState, newState) => {
			console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
		});
		player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});
	},
};

const video_player = async (guild, song) => {
	const song_queue = queue.get(guild.id);

	// If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
	if (!song) {
		song_queue.voice_channel.leave();
		queue.delete(guild.id);
		return;
	}
	const stream = play.stream();
	song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
		.on(AudioPlayerStatus.Idle, () => {
			song_queue.songs.shift();
			video_player(guild, song_queue.songs[0]);
		});
	await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`);
};
const play = require('play-dl');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play youtube')
		.addStringOption(option => option.setName('query')
			.setDescription('Enter terms or link here')
			.setRequired(true)),
	async execute(message) {
		message.reply('Playing your song!');
		const connection = joinVoiceChannel({
			channelId : message.member.voice.channel.id,
			guildId : message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

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
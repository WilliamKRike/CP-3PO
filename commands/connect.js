const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('connect to current channel'),
	execute(message) {
		message.reply('Joining channel...');
		joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
		const textCh = message.channelId;
		const channel = message.guild.channels.cache.get(textCh);
		channel.send(`The lobby I am in is ${message.guild.me.voice.channelId}`);
		console.log(message.guild.me.voice.channelId);
	} };
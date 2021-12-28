const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = new Map();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute(interaction) {
		const serverQueue = queue.get(interaction.guide.id);
		const textCh = interaction.channelId;
		const channel = interaction.guild.channels.cache.get(textCh);
		channel.send(`Pong! ${interaction.user}`);

		if (!serverQueue) {
			const queue_constructor = {
				voiceChannel: interaction.member.voice.channel.id,
				textChannel: textCh,
				connection: null,
				songs: [],
			};
			queue.set(interaction.guild.id, queue_constructor);
			queue_constructor.songs.push(33);
		}
	},
};
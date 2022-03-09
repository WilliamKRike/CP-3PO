const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('Reacts to message'),
	async execute(interaction) {
		const message = await interaction.reply({ content: 'You can react with custom emojis!', fetchReply: true });
		const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'huGoblin');
		const channel = interaction.guild.channels.cache.get(interaction.channelId);
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Pick a role')
			.setURL('https://google.com/')
			.setAuthor({ name: 'TR-1N3R', iconURL: 'https://imgur.com/a/jQ06E2r', url: 'https://discord.gg' })
			.setDescription('Add Roles')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		channel.send({ embeds: [exampleEmbed] });
		message.react(reactionEmoji);
	},
};
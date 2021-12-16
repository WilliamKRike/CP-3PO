// at the top of your file
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('graffsearchhistory')
		.setDescription('Replies with Graffs`s search history'),
	async execute(interaction) {
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Search history in the past 24 hours')
			.setURL('https://discord.js.org/')
			.setAuthor('Google', '', 'https://google.com')
			.setDescription('Graffster44`s Search History')

			.addFields(
				{ name: '1. Underage Women \n2. Underage boys\n3. Matt Damon nudes\n4. How to tell my long distance girlfriend i have an extra chromosome\n5.TFT anime music video' },
				{ name: '\u200B', value: '\u200B' },
			)
			.setImage('https://cdn.discordapp.com/avatars/169631919447867393/bf20c3615f581491e8013dc649cdf0cd.webp?size=128')
			.setTimestamp()
			.setFooter('Some results may contain copyrighted content. Google 2021 (c)');
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};